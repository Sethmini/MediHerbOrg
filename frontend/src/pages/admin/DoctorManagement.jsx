import React, { useState, useEffect } from "react";
import axiosInstance from "../../AxiosInstance";
import { Table, Button, Container, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import UpdateDoctor from "./UpdateDoctor";
import AddDoctor from "./AddDoctor";
import Swal from "sweetalert2";
import "./styles/DoctorManagement.css"; // Make sure this CSS file is imported

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await axiosInstance.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/doctors/${id}`);
        Swal.fire("Deleted!", "Doctor has been deleted.", "success");
        fetchDoctors();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.error(error);
      }
    }
  };

  return (
    <Container fluid className="my-4">
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary">Doctor Management Dashboard</h3>
        <Button variant="success" onClick={() => setShowAdd(true)}>
          Add Doctor
        </Button>
      </div>

      <AddDoctor
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        refreshDoctors={fetchDoctors}
      />

      <Table
        striped
        bordered
        hover
        responsive
        className="shadow-sm bg-white rounded"
        style={{ backgroundColor: "white" }}
      >
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Registration</th>
            <th>Experience</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Days</th>
            <th>Time</th>
            <th>Active</th>
            <th style={{ minWidth: "100px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.fullName}</td>
              <td>{doc.specialization}</td>
              <td>{doc.registrationNumber}</td>
              <td>{doc.experienceYears}</td>
              <td>{doc.contactNumber}</td>
              <td>{doc.email}</td>
              <td>
                {doc.availableDays.map((day, index) => (
                  <Badge
                    key={index}
                    bg="info"
                    className="me-1 mb-1"
                    style={{ borderRadius: "0.25rem" }}
                  >
                    {day}
                  </Badge>
                ))}
              </td>
              <td>
                {doc.consultationTime.start} - {doc.consultationTime.end}
              </td>
              <td>{doc.isActive ? "Yes" : "No"}</td>
              <td
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem", minWidth: "100px" }}
              >
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => {
                    setSelectedDoctorId(doc._id);
                    setShowUpdate(true);
                  }}
                  title="Edit Doctor"
                  className="icon-btn"
                >
                  <PencilSquare />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(doc._id)}
                  title="Delete Doctor"
                  className="icon-btn"
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedDoctorId && (
        <UpdateDoctor
          show={showUpdate}
          handleClose={() => setShowUpdate(false)}
          doctorId={selectedDoctorId}
          refreshDoctors={fetchDoctors}
        />
      )}
    </Container>
  );
};

export default DoctorManagement;
