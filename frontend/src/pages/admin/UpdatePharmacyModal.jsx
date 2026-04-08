import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form, Alert, Spinner, ListGroup, Row, Col, Accordion } from 'react-bootstrap';
import AxiosInstance from '../../AxiosInstance';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DraggableMarker = ({ position, setPosition }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const latLng = marker.getLatLng();
        setPosition({ lat: latLng.lat, lng: latLng.lng });
      }
    },
  };

  return (
    <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}>
      <Popup>Drag to adjust pharmacy location</Popup>
    </Marker>
  );
};

const UpdatePharmacyModal = ({ show, handleClose, pharmacy }) => {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    email: '',
    licenseNumber: '',
    owner: '',
    latitude: '',
    longitude: '',
    openingHours: {
      monday: { open: '', close: '' },
      tuesday: { open: '', close: '' },
      wednesday: { open: '', close: '' },
      thursday: { open: '', close: '' },
      friday: { open: '', close: '' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' }
    }
  });

  const [mapPosition, setMapPosition] = useState({ lat: 51.505, lng: -0.09 }); // default
  const [pharmacists, setPharmacists] = useState([]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const days = Object.keys(formData.openingHours);

  // Populate form when pharmacy changes
  useEffect(() => {
    if (pharmacy) {
      setFormData({
        name: pharmacy.name || '',
        email: pharmacy.email || '',
        phone: pharmacy.phone || '',
        licenseNumber: pharmacy.licenseNumber || '',
        owner: pharmacy.owner?._id || '',
        street: pharmacy.address?.street || '',
        city: pharmacy.address?.city || '',
        state: pharmacy.address?.state || '',
        zipcode: pharmacy.address?.zipcode || '',
        latitude: pharmacy.latitude || '',
        longitude: pharmacy.longitude || '',
        openingHours: pharmacy.openingHours || {
          monday: { open: '', close: '' },
          tuesday: { open: '', close: '' },
          wednesday: { open: '', close: '' },
          thursday: { open: '', close: '' },
          friday: { open: '', close: '' },
          saturday: { open: '', close: '' },
          sunday: { open: '', close: '' }
        }
      });
      setSearch(pharmacy.owner?.useremail || '');
      if (pharmacy.latitude && pharmacy.longitude) {
        setMapPosition({ lat: parseFloat(pharmacy.latitude), lng: parseFloat(pharmacy.longitude) });
      }
    }
  }, [pharmacy]);

  // Fetch pharmacists
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await AxiosInstance.get('auth/all-users');
        const filtered = res.data.filter(user => user.role === 'pharmacist');
        setPharmacists(filtered);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load pharmacist list.');
      }
    };
    fetchUsers();
  }, []);

  // Get user's current location if pharmacy coordinates are not set
  useEffect(() => {
    if ((!pharmacy?.latitude || !pharmacy?.longitude) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setFormData(prev => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }));
        },
        (err) => console.warn('Geolocation error:', err)
      );
    }
  }, [pharmacy]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpeningHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: { ...prev.openingHours[day], [field]: value }
      }
    }));
  };

  const handlePharmacistSelect = (user) => {
    if (!user || !user._id) return;
    setFormData(prev => ({ ...prev, owner: user._id }));
    setSearch(user.useremail);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be 10 digits.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email address.');
      setLoading(false);
      return;
    }

    if (!formData.owner) {
      setError('Please assign a pharmacist before submitting.');
      setLoading(false);
      return;
    }

    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      setError('Latitude must be a number between -90 and 90.');
      setLoading(false);
      return;
    }
    if (isNaN(lng) || lng < -180 || lng > 180) {
      setError('Longitude must be a number between -180 and 180.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        owner: formData.owner,
        latitude: lat,
        longitude: lng,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode
        },
        openingHours: formData.openingHours
      };

      await AxiosInstance.put(`/pharmacies/${pharmacy._id}`, payload);

      setSuccess('Pharmacy updated successfully!');
      setTimeout(() => handleClose(), 1200);
    } catch (err) {
      console.error('Error updating pharmacy:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update pharmacy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPharmacists = pharmacists.filter(user =>
    user.useremail?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold" style={{ color: 'green' }}>
          Update Pharmacy
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <h5 style={{ color: 'green' }} className="mt-3">Pharmacy Details</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>Pharmacy Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>License Number</Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 style={{ color: 'green' }} className="mt-3">Address</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Map */}
          <h5 style={{ color: 'green' }} className="mt-3">Location</h5>
          <MapContainer
            center={mapPosition}
            zoom={15}
            style={{ height: '300px', width: '100%', marginBottom: '15px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker
              position={mapPosition}
              setPosition={(pos) => {
                setMapPosition(pos);
                setFormData(prev => ({
                  ...prev,
                  latitude: pos.lat,
                  longitude: pos.lng
                }));
              }}
            />
          </MapContainer>

          {/* Coordinates Fields */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  step="any"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  step="any"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Info */}
          <h5 style={{ color: 'green' }} className="mt-3">Contact Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: 'green' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Pharmacist Selector */}
          <h5 style={{ color: 'green' }} className="mt-3">Assign Pharmacist</h5>
          <Form.Group className="mb-4 position-relative">
            <Form.Control
              type="text"
              placeholder="Search pharmacist by email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              autoComplete="off"
              required
            />
            {showDropdown && filteredPharmacists.length > 0 && (
              <ListGroup
                className="position-absolute w-100 shadow-sm"
                style={{ maxHeight: '150px', overflowY: 'auto', zIndex: 1000 }}
              >
                {filteredPharmacists.map(user => (
                  <ListGroup.Item
                    key={user._id}
                    action
                    onClick={() => handlePharmacistSelect(user)}
                  >
                    <span style={{ color: 'green' }}>{user.useremail}</span> ({user.role})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form.Group>

          {/* Opening Hours */}
          <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <strong style={{ color: 'green' }}>Opening Hours (Click to expand)</strong>
              </Accordion.Header>
              <Accordion.Body>
                {days.map(day => (
                  <Row key={day} className="align-items-center mb-2">
                    <Col xs={3} className="text-capitalize fw-semibold" style={{ color: 'green' }}>
                      {day}
                    </Col>
                    <Col xs={4}>
                      <Form.Control
                        type="time"
                        value={formData.openingHours[day]?.open || ''}
                        onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                      />
                    </Col>
                    <Col xs={1} className="text-center" style={{ color: 'green' }}>to</Col>
                    <Col xs={4}>
                      <Form.Control
                        type="time"
                        value={formData.openingHours[day]?.close || ''}
                        onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                      />
                    </Col>
                  </Row>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="me-2"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: 'green', borderColor: 'green' }}
              type="submit"
              disabled={loading || !formData.owner}
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Update Pharmacy'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePharmacyModal;
  