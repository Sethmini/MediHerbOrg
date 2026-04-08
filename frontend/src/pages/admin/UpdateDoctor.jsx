import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import axiosInstance from "../../AxiosInstance";

const daysOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const specializations = [
  "Hepatology",
  "Otolaryngology (ENT)",
  "Rheumatology",
  "Infectious Disease",
  "General Medicine",
  "Gastroenterology",
  "Ophthalmology",
  "Neurology",
  "Psychiatry",
  "General Surgery",
  "Immunology",
  "Endocrinology",
  "Dermatology",
];

const UpdateDoctor = ({ show, handleClose, doctorId, refreshDoctors }) => {
  const [doctor, setDoctor] = useState({
    fullName: "",
    specialization: "",
    registrationNumber: "",
    experienceYears: 0,
    contactNumber: "",
    email: "",
    address: { street: "", city: "", state: "", postalCode: "" },
    availableDays: [],
    consultationTime: { start: "", end: "" },
    photo: null, // Only File object
    photoUrl: "", // Base64 image from backend
    description: "",
    isActive: true,
  });

  // Fetch doctor data
  useEffect(() => {
    if (doctorId) {
      axiosInstance
        .get(`/doctors/${doctorId}`)
        .then((res) => {
          setDoctor((prev) => ({
            ...prev,
            ...res.data,
            photo: null, // Prevent binary data from becoming photo File
            photoUrl: res.data.photoUrl || "",
          }));
        })
        .catch((err) => console.error(err));
    }
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "isActive") {
      setDoctor({ ...doctor, isActive: checked });
    } else if (name.includes("address.")) {
      const key = name.split(".")[1];
      setDoctor({ ...doctor, address: { ...doctor.address, [key]: value } });
    } else if (name.includes("consultationTime.")) {
      const key = name.split(".")[1];
      setDoctor({
        ...doctor,
        consultationTime: { ...doctor.consultationTime, [key]: value },
      });
    } else {
      setDoctor({ ...doctor, [name]: value });
    }
  };

  const handleDaysChange = (selectedOptions) => {
    setDoctor({
      ...doctor,
      availableDays: selectedOptions ? selectedOptions.map((o) => o.value) : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("fullName", doctor.fullName);
      formData.append("specialization", doctor.specialization);
      formData.append("registrationNumber", doctor.registrationNumber);
      formData.append("experienceYears", doctor.experienceYears);
      formData.append("contactNumber", doctor.contactNumber);
      formData.append("email", doctor.email);
      formData.append("description", doctor.description);
      formData.append("isActive", doctor.isActive);

      // Address fields
      formData.append("address[street]", doctor.address.street);
      formData.append("address[city]", doctor.address.city);
      formData.append("address[state]", doctor.address.state);
      formData.append("address[postalCode]", doctor.address.postalCode);

      // Consultation time
      formData.append("consultationTime[start]", doctor.consultationTime.start);
      formData.append("consultationTime[end]", doctor.consultationTime.end);

      // Available days list
      doctor.availableDays.forEach((day) =>
        formData.append("availableDays[]", day)
      );

      // New photo file
      if (doctor.photo instanceof File) {
        formData.append("photo", doctor.photo);
      }

      await axiosInstance.put(`/doctors/${doctorId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      refreshDoctors();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Update Doctor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* PERSONAL INFO */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Personal Information
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>
                    Full Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={doctor.fullName}
                    onChange={handleChange}
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>
                    Specialization <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>
                    Registration Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="registrationNumber"
                    value={doctor.registrationNumber}
                    onChange={handleChange}
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Experience Years</Form.Label>
                  <Form.Control
                    type="number"
                    name="experienceYears"
                    value={doctor.experienceYears}
                    onChange={handleChange}
                    min={0}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* CONTACT INFORMATION */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-success text-white">
              Contact Information
            </Card.Header>

            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    value={doctor.contactNumber}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={doctor.email}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* ADDRESS */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-info text-white">Address</Card.Header>

            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    name="address.street"
                    value={doctor.address.street}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="address.city"
                    value={doctor.address.city}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="address.state"
                    value={doctor.address.state}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    name="address.postalCode"
                    value={doctor.address.postalCode}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* AVAILABILITY */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-warning text-dark">
              Availability & Consultation
            </Card.Header>

            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Available Days</Form.Label>
                <Select
                  isMulti
                  options={daysOptions}
                  value={daysOptions.filter((day) =>
                    doctor.availableDays.includes(day.value)
                  )}
                  onChange={handleDaysChange}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Label>Consultation Start</Form.Label>
                  <Form.Control
                    type="text"
                    name="consultationTime.start"
                    value={doctor.consultationTime.start}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Consultation End</Form.Label>
                  <Form.Control
                    type="text"
                    name="consultationTime.end"
                    value={doctor.consultationTime.end}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* OTHER DETAILS */}
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-secondary text-white">
              Other Details
            </Card.Header>

            <Card.Body>
              {/* IMAGE PREVIEW */}
              {(doctor.photo instanceof File || doctor.photoUrl) && (
                <div className="mb-3 d-flex align-items-center">
                  <img
                    src={
                      doctor.photo instanceof File
                        ? URL.createObjectURL(doctor.photo)
                        : doctor.photoUrl
                    }
                    alt="Doctor"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      setDoctor({ ...doctor, photo: null, photoUrl: "" })
                    }
                  >
                    Remove
                  </Button>
                </div>
              )}

              {/* UPLOAD NEW PHOTO */}
              <Form.Group className="mb-3">
                <Form.Label>Upload New Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setDoctor({ ...doctor, photo: e.target.files[0] })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={doctor.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Active"
                name="isActive"
                checked={doctor.isActive}
                onChange={handleChange}
              />
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="success">
            Update Doctor
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateDoctor;
