import React, { useEffect, useState } from 'react';
import { Button, Table, Spinner, Alert, Accordion } from 'react-bootstrap';
import AxiosInstance from '../../AxiosInstance';
import AddPharmacyModal from './AddPharmacyModal';
import UpdatePharmacyModal from './UpdatePharmacyModal';

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all pharmacies
  const fetchPharmacies = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await AxiosInstance.get('/pharmacies');
      if (Array.isArray(res.data)) {
        setPharmacies(res.data);
      } else {
        setPharmacies([]);
        setError('Unexpected response format from server.');
      }
    } catch (err) {
      console.error('Error fetching pharmacies:', err);
      setError('Failed to fetch pharmacies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  // Delete pharmacy
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pharmacy?')) return;
    try {
      await AxiosInstance.delete(`/pharmacies/${id}`);
      setPharmacies((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting pharmacy:', err);
      setError('Failed to delete pharmacy. Please try again later.');
    }
  };

  // Open update modal
  const handleUpdate = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-success">Pharmacy List</h2>

      {/* Add Button */}
      <Button
        className="mb-3"
        style={{ backgroundColor: '#4caf50', border: 'none' }}
        onClick={() => setShowAdd(true)}
      >
        Add Pharmacy
      </Button>

      {/* Loading */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="success" /> Loading pharmacies...
        </div>
      )}

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Empty */}
      {!loading && pharmacies.length === 0 && !error && (
        <p className="text-center">No pharmacies found.</p>
      )}

      {/* Table */}
      {!loading && pharmacies.length > 0 && (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-success">
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Town</th>
                <th>License</th>
                <th>Opening Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacy) => (
                <tr key={pharmacy._id}>
                  <td>{pharmacy.name}</td>
                  <td>
                    {pharmacy.address.street}, {pharmacy.address.city}, {pharmacy.address.state}{' '}
                    {pharmacy.address.zipcode}
                  </td>
                  <td>{pharmacy.phone}</td>
                  <td>{pharmacy.address.city}</td>
                  <td>{pharmacy.licenseNumber}</td>
                  <td>
                    {pharmacy.openingHours ? (
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>View Hours</Accordion.Header>
                          <Accordion.Body>
                            <Table size="sm" bordered>
                              <thead>
                                <tr>
                                  <th>Day</th>
                                  <th>Open</th>
                                  <th>Close</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(pharmacy.openingHours).map(([day, time]) => (
                                  <tr key={day}>
                                    <td className="text-capitalize">{day}</td>
                                    <td>{time.open || '-'}</td>
                                    <td>{time.close || '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ) : (
                      <span className="text-muted">Not set</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleUpdate(pharmacy)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(pharmacy._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add Pharmacy Modal */}
      <AddPharmacyModal
        show={showAdd}
        handleClose={() => {
          setShowAdd(false);
          fetchPharmacies();
        }}
      />

      {/* Update Pharmacy Modal */}
      {selectedPharmacy && (
        <UpdatePharmacyModal
          show={!!selectedPharmacy}
          pharmacy={selectedPharmacy}
          handleClose={() => {
            setSelectedPharmacy(null);
            fetchPharmacies();
          }}
        />
      )}
    </div>
  );
};

export default PharmacyList;
