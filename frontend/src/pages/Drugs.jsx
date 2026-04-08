import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  Row,
  Col,
  Badge,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Tab,
  Tabs
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import AxiosInstance from '../AxiosInstance';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ---------------- LEAFLET ICON FIX ---------------- */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

/* ---------------- UTILITY FUNCTIONS ---------------- */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/* ---------------- MAP HELPERS ---------------- */
const ChangeMapBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length > 1) {
      setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [20, 20], animate: true });
      }, 150);
    }
  }, [bounds, map]);

  return null;
};

const UserLocationMarker = ({ userLocation }) => {
  if (!userLocation) return null;

  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
      <Popup>
        <strong className="text-primary">Your Location</strong>
      </Popup>
    </Marker>
  );
};

const MapEventHandler = () => {
  const map = useMap();

  useMapEvents({
    load: () => map.invalidateSize(),
    zoomend: () => map.invalidateSize(),
    moveend: () => map.invalidateSize()
  });

  return null;
};

/* ---------------- MAIN COMPONENT ---------------- */
function Drugs() {
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [mapBounds, setMapBounds] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        setLoading(true);
        const res = await AxiosInstance.get('drugs/');
        const allDrugs = res.data || [];

        setDrugs(allDrugs);
        setFilteredDrugs(allDrugs);

        const uniquePharmacies = new Map();

        allDrugs.forEach((d) => {
          const p = d.pharmacy;
          if (
            !p ||
            typeof p !== 'object' ||
            !p._id ||
            !p.location?.coordinates ||
            p.location.coordinates.length !== 2
          )
            return;

          const [lng, lat] = p.location.coordinates;
          if (isNaN(lat) || isNaN(lng)) return;

          if (!uniquePharmacies.has(p._id)) {
            uniquePharmacies.set(p._id, p);
          }
        });

        const pharmacyList = Array.from(uniquePharmacies.values());
        setPharmacies(pharmacyList);
        setFilteredPharmacies(pharmacyList);
      } catch (err) {
        setError('Failed to load drugs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Get user's location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLocationError('');
          },
          (error) => {
            console.warn('Geolocation error:', error);
            setLocationError('Unable to get your location. Distance filtering disabled.');
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
      }
    };

    fetchDrugs();
    getUserLocation();
  }, []);

  /* ---------------- SEARCH FILTER (drug name + distance) ---------------- */
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setFilteredDrugs(drugs);
      setFilteredPharmacies(pharmacies);
      setMapBounds(null);
      return;
    }

    setActiveTab('list');

    const filtered = drugs.filter((drug) => {
      const name = (drug.name || '').toLowerCase();
      return name.startsWith(term); // Only drug name
    });

    setFilteredDrugs(filtered);

    // Get pharmacies that have the filtered drugs
    const pharmacyIds = new Set(
      filtered.map((d) => d.pharmacy?._id).filter(Boolean)
    );

    let filteredPharms = pharmacies.filter((p) => pharmacyIds.has(p._id));

    // If user location is available and we have search results, filter by 20KM radius
    if (userLocation && filteredPharms.length > 0) {
      filteredPharms = filteredPharms.filter((p) => {
        const [lng, lat] = p.location.coordinates;
        const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
        return distance <= 20; // 20KM radius
      });

      // Also filter drugs to only those in nearby pharmacies
      const nearbyPharmacyIds = new Set(filteredPharms.map(p => p._id));
      const nearbyDrugs = filtered.filter(d => 
        d.pharmacy && nearbyPharmacyIds.has(d.pharmacy._id)
      );
      setFilteredDrugs(nearbyDrugs);
    }

    setFilteredPharmacies(filteredPharms);
  }, [searchTerm, drugs, pharmacies, userLocation]);

  /* ---------------- MAP BOUNDS ---------------- */
  const updateBounds = useCallback(() => {
    const coords = filteredPharmacies
      .map((p) => {
        const c = p.location?.coordinates;
        if (!c || c.length !== 2) return null;
        return [c[1], c[0]]; // [lat, lng] for Leaflet
      })
      .filter(Boolean);

    // Include user location in bounds if available
    if (userLocation) {
      coords.push([userLocation.lat, userLocation.lng]);
    }

    if (coords.length > 1) setMapBounds(coords);
  }, [filteredPharmacies, userLocation]);

  useEffect(() => {
    updateBounds();
  }, [updateBounds]);

  /* ---------------- UI STATES ---------------- */
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: 400 }}>
        <Spinner animation="border" variant="success" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="mx-auto" style={{ maxWidth: 600 }}>
        {error}
      </Alert>
    );

  /* ---------------- RENDER ---------------- */
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">All Drugs</h2>
        <div className="d-flex flex-column align-items-end">
          <Badge bg="success" className="fs-6 mb-1">
            {filteredDrugs.length} drugs in {filteredPharmacies.length} pharmacies
          </Badge>
          {searchTerm && userLocation && (
            <small className="text-muted">Filtered to pharmacies within 20KM</small>
          )}
          {locationError && (
            <small className="text-warning">{locationError}</small>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <InputGroup className="mb-4 shadow-sm">
        <InputGroup.Text className="bg-white border-success">
          <Search className="text-success" />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by drug name (shows pharmacies within 20KM)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-start-0 border-success"
        />
      </InputGroup>

      <Tabs activeKey={activeTab} onSelect={setActiveTab} justify>
        {/* LIST VIEW */}
        <Tab eventKey="list" title="List View">
          {filteredDrugs.length === 0 ? (
            <Alert variant="info" className="mt-3 text-center">
              No drugs found
            </Alert>
          ) : (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4 mt-1">
              {filteredDrugs.map((drug) => (
                <Col key={drug._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-success fw-bold">
                        {drug.name}
                      </Card.Title>
                      <div>Manufacturer: {drug.manufacturer}</div>
                      <div>Batch: {drug.batchNumber}</div>
                      <div>
                        Expiry:{' '}
                        {new Date(drug.expiryDate).toLocaleDateString()}
                      </div>
                      <hr />
                      <div className="fw-bold text-success">
                        Rs:{drug.price.toLocaleString()}
                      </div>
                      <Badge
                        bg={
                          drug.quantityInStock > 10
                            ? 'success'
                            : drug.quantityInStock > 0
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {drug.quantityInStock} in stock
                      </Badge>
                      <div className="mt-2 text-muted small">
                        {typeof drug.pharmacy === 'object'
                          ? drug.pharmacy?.name
                          : ''}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        {/* MAP VIEW */}
        <Tab
          eventKey="map"
          title={`Map View (${filteredPharmacies.length})`}
          disabled={!filteredPharmacies.length}
        >
          <div style={{ height: 500 }} className="mt-3">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapEventHandler />
              <ChangeMapBounds bounds={mapBounds || []} />
              <UserLocationMarker userLocation={userLocation} />

              {filteredPharmacies.map((p) => {
                const [lng, lat] = p.location.coordinates;
                return (
                  <Marker key={p._id} position={[lat, lng]}>
                    <Popup>
                      <strong className="text-success">{p.name}</strong>
                      <br />
                      {p.address?.city}, {p.address?.state}
                      <br />
                      📞 {p.phone}
                      <br />
                      💊 Drugs:{" "}
                      {filteredDrugs.filter(
                        (d) =>
                          typeof d.pharmacy === "object" &&
                          d.pharmacy._id === p._id
                      ).length}
                      {userLocation && (
                        <>
                          <br />
                          📍 Distance: {calculateDistance(
                            userLocation.lat, 
                            userLocation.lng, 
                            lat, 
                            lng
                          ).toFixed(1)} KM
                        </>
                      )}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Drugs;
