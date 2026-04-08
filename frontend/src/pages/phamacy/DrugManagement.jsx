import React, { useState, useEffect } from 'react'
import axios from '../../AxiosInstance'
import { Modal, Button, Spinner, Alert, Table, Form, Navbar, Container, Nav } from 'react-bootstrap'
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function DrugManagement() {
  const [drugs, setDrugs] = useState([])
  const [pharmacy, setPharmacy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    batchNumber: '',
    expiryDate: '',
    price: '',
    quantityInStock: ''
  })
  const [editingDrug, setEditingDrug] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user || !user._id) throw new Error('User not logged in')

        const pharmacyRes = await axios.get('/pharmacies')
        const pharmacies = pharmacyRes.data

        const userPharmacy = pharmacies.find(
          (p) => p.owner?._id?.toString() === user._id?.toString()
        )

        setPharmacy(userPharmacy || null)

        if (userPharmacy) {
          const drugsRes = await axios.get(`/drugs/pharmacy/${userPharmacy._id}`)
          setDrugs(drugsRes.data)
        } else {
          setDrugs([])
        }
      } catch (err) {
        console.error(err)
        setError('Failed to fetch pharmacy or drug data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const openModal = (drug = null) => {
    if (drug) {
      setEditingDrug(drug)
      setFormData({
        name: drug.name,
        manufacturer: drug.manufacturer,
        batchNumber: drug.batchNumber,
        expiryDate: drug.expiryDate?.split('T')[0],
        price: drug.price,
        quantityInStock: drug.quantityInStock
      })
    } else {
      setEditingDrug(null)
      setFormData({
        name: '',
        manufacturer: '',
        batchNumber: '',
        expiryDate: '',
        price: '',
        quantityInStock: ''
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pharmacy) return alert('No pharmacy associated with your account.')
    setSubmitLoading(true)

    try {
      const payload = { ...formData, pharmacy: pharmacy._id }

      if (editingDrug) {
        await axios.put(`/drugs/${editingDrug._id}`, payload)
        alert('Drug updated successfully')
      } else {
        await axios.post('/drugs', payload)
        alert('Drug added successfully')
      }

      const updatedDrugs = await axios.get(`/drugs/pharmacy/${pharmacy._id}`)
      setDrugs(updatedDrugs.data)
      closeModal()
    } catch (err) {
      console.error(err)
      alert('Error saving drug.')
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this drug?')) return
    try {
      await axios.delete(`/drugs/${id}`)
      setDrugs((prev) => prev.filter((d) => d._id !== id))
      alert('Drug deleted successfully')
    } catch (err) {
      console.error(err)
      alert('Failed to delete drug.')
    }
  }

  // Filter drugs based on search term
  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>
  if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>

  return (
    <>
      {/* Navbar / Hospital Header */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand>Pharmacy Dashboard</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={handleLogout}><FaSignOutAlt /> Logout</Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="container">
        {pharmacy ? (
          <div className="mb-3">
            <h4>{pharmacy.name}</h4>
            <p>
              <strong>Address:</strong> {pharmacy.address ? `${pharmacy.address.street}, ${pharmacy.address.city}, ${pharmacy.address.state} - ${pharmacy.address.zipcode}` : 'N/A'}
              <br />
              <strong>Phone:</strong> {pharmacy.phone}
            </p>
          </div>
        ) : (
          <p className="text-center text-muted mb-4">No pharmacy found for your account.</p>
        )}

        {pharmacy && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Control
              type="text"
              placeholder="Search by name, manufacturer, batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '300px' }}
            />
            <Button variant="success" onClick={() => openModal()}><FaPlus /> Add New Drug</Button>
          </div>
        )}

        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Batch No.</th>
              <th>Expiry Date</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrugs.length > 0 ? filteredDrugs.map(drug => (
              <tr key={drug._id}>
                <td>{drug.name}</td>
                <td>{drug.manufacturer}</td>
                <td>{drug.batchNumber}</td>
                <td>{new Date(drug.expiryDate).toLocaleDateString()}</td>
                <td>Rs:{drug.price}</td>
                <td>{drug.quantityInStock}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => openModal(drug)}><FaEdit /> Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(drug._id)}><FaTrash /> Delete</Button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">No drugs found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Modal */}
        <Modal show={modalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editingDrug ? 'Edit Drug' : 'Add New Drug'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Drug Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Batch Number</Form.Label>
                <Form.Control type="text" name="batchNumber" value={formData.batchNumber} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity in Stock</Form.Label>
                <Form.Control type="number" name="quantityInStock" value={formData.quantityInStock} onChange={handleChange} required />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal} disabled={submitLoading}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={submitLoading}>
                {submitLoading ? 'Saving...' : editingDrug ? 'Update' : 'Add'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default DrugManagement
