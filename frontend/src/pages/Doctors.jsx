import React, { useEffect, useState } from "react";
import ChatbotModal from "./ChatbotModal";
import axiosInstance from "../AxiosInstance";
import { Form, Badge, Row, Col, Button } from "react-bootstrap";
import {
  FaStar,
  FaUserMd,
  FaClock,
  FaCalendarAlt,
  FaComments,
  FaLightbulb,
  FaUser,
} from "react-icons/fa";
import Select from "react-select";
import "./styles/Doctors.css";

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

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Convert photo buffer to base64 URL
const buildPhotoUrl = (photo) => {
  if (!photo || !photo.data || !photo.data.data) return null;
  const binary = new Uint8Array(photo.data.data).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  const base64String = btoa(binary);
  return `data:${photo.contentType};base64,${base64String}`;
};

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState([]);
  const [filterDay, setFilterDay] = useState("");
  const [filterExperience, setFilterExperience] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [predictedSpec, setPredictedSpec] = useState(
    localStorage.getItem("predicted_specialization") || ""
  );

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get("/doctors");
        const processedDoctors = res.data.map((doc) => ({
          ...doc,
          photoUrl: buildPhotoUrl(doc.photo),
        }));
        setDoctors(processedDoctors);
        setFilteredDoctors(processedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let filtered = [...doctors];

    if (searchText.trim() !== "") {
      filtered = filtered.filter((doc) =>
        doc.fullName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterSpecialization.length > 0) {
      const selectedSpecs = filterSpecialization.map((s) => s.value);
      filtered = filtered.filter((doc) =>
        selectedSpecs.includes(doc.specialization)
      );
    }

    if (filterDay !== "") {
      filtered = filtered.filter((doc) =>
        doc.availableDays?.includes(filterDay)
      );
    }

    if (filterExperience > 0) {
      filtered = filtered.filter(
        (doc) => doc.experienceYears >= filterExperience
      );
    }

    setFilteredDoctors(filtered);
  }, [searchText, filterSpecialization, filterDay, filterExperience, doctors]);

  // AI Recommendations - refresh immediately
  useEffect(() => {
    if (!predictedSpec) {
      setRecommendedDoctors([]);
      return;
    }

    const recommended = doctors
      .filter((doc) => doc.specialization === predictedSpec)
      .sort((a, b) => b.experienceYears - a.experienceYears)
      .slice(0, 3);

    setRecommendedDoctors(recommended);
  }, [predictedSpec, doctors]);

  const handleClearRecommendation = () => {
    localStorage.removeItem("predicted_specialization");
    setPredictedSpec("");
    setRecommendedDoctors([]);
  };

  const handleSaveRecommendation = (spec) => {
    localStorage.setItem("predicted_specialization", spec);
    setPredictedSpec(spec); // triggers immediate re-render
  };

  // Rating system based on experience
  const getRating = (years) => {
    if (!years) return 0;
    if (years >= 15) return 5;
    if (years >= 12) return 4;
    if (years >= 8) return 3;
    if (years >= 4) return 2;
    if (years > 0) return 1;
    return 0;
  };

  const specializationOptions = specializations.map((spec) => ({
    value: spec,
    label: spec,
  }));

  // Render doctor image with fallback
  const DoctorImage = ({ photoUrl, fullName }) =>
    photoUrl ? (
      <img
        src={photoUrl}
        alt={fullName}
        className="doctor-img rounded-circle border border-white"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
    ) : (
      <div
        className="d-flex justify-content-center align-items-center bg-light rounded-circle border border-white"
        style={{ width: "100px", height: "100px" }}
      >
        <FaUser size={40} color="#aaa" />
      </div>
    );

  return (
    <div className="container my-4 position-relative">
      {/* Floating Chatbot button */}
      <Button
        variant="primary"
        className="position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          zIndex: 1000,
        }}
        onClick={() => setChatOpen(true)}
      >
        <FaComments size={24} />
      </Button>

      <ChatbotModal
        show={chatOpen}
        handleClose={() => setChatOpen(false)}
        onSpecializationDetected={handleSaveRecommendation}
      />

      {/* Recommendation Section */}
      {predictedSpec && (
        <div className="recommended-section mb-5">
          <h4 className="mb-3">
            <FaLightbulb className="me-2 text-warning" /> Recommended Doctors for{" "}
            <strong>{predictedSpec}</strong>
          </h4>

          {recommendedDoctors.length > 0 ? (
            <Row className="g-4">
              {recommendedDoctors.map((doctor) => (
                <Col key={doctor._id} xs={12} sm={6} md={4}>
                  <div className="doctor-card recommended shadow-sm bg-white rounded text-center position-relative p-4">
                    <DoctorImage
                      photoUrl={doctor.photoUrl}
                      fullName={doctor.fullName}
                    />

                    <Badge className="specialization-badge d-inline-block my-2 px-3 py-1 fw-semibold">
                      {doctor.specialization}
                    </Badge>

                    <h5 className="fw-bold">{doctor.fullName}</h5>

                    <div className="rating-stars d-flex justify-content-center gap-1 mb-2">
                      {Array.from({ length: getRating(doctor.experienceYears) }).map(
                        (_, i) => (
                          <FaStar key={i} color="#f5b50a" />
                        )
                      )}
                    </div>

                    <div className="text-secondary">
                      <FaClock /> {doctor.consultationTime?.start} -{" "}
                      {doctor.consultationTime?.end}
                    </div>
                    <div className="text-secondary">
                      <FaCalendarAlt /> {doctor.availableDays?.join(", ")}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-muted">No doctors match this specialization yet.</p>
          )}

          <Button
            variant="outline-secondary"
            size="sm"
            className="mt-3"
            onClick={handleClearRecommendation}
          >
            Clear Recommendation
          </Button>
        </div>
      )}

      {/* Filters */}
      <Form className="filters shadow-sm bg-light p-3 rounded mb-4 d-flex flex-wrap gap-3">
        <Form.Group style={{ flex: "1 1 200px" }}>
          <Form.Label>Search Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Doctor name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ flex: "1 1 300px" }}>
          <Form.Label>Specialization</Form.Label>
          <Select
            isMulti
            options={specializationOptions}
            value={filterSpecialization}
            onChange={setFilterSpecialization}
          />
        </Form.Group>

        <Form.Group style={{ flex: "1 1 150px" }}>
          <Form.Label>Available Day</Form.Label>
          <Form.Select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
          >
            <option value="">All Days</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group style={{ flex: "1 1 150px" }}>
          <Form.Label>Min Experience</Form.Label>
          <Form.Control
            type="number"
            min={0}
            value={filterExperience}
            onChange={(e) => setFilterExperience(Number(e.target.value))}
          />
        </Form.Group>
      </Form>

      {/* Doctor Cards */}
      <Row className="g-4">
        {filteredDoctors.length === 0 ? (
          <p className="text-center">No doctors found.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <Col key={doctor._id} xs={12} sm={6} md={4}>
              <div className="doctor-card shadow-sm bg-white rounded p-4 text-center position-relative">
                <DoctorImage
                  photoUrl={doctor.photoUrl}
                  fullName={doctor.fullName}
                />

                <Badge className="specialization-badge d-inline-block mt-3 px-3 py-1 fw-semibold">
                  {doctor.specialization}
                </Badge>

                <h5 className="mt-3 fw-bold">
                  <FaUserMd className="me-2 text-primary" />
                  {doctor.fullName}
                </h5>

                <div className="rating-stars d-flex justify-content-center gap-1 mb-2">
                  {Array.from({ length: getRating(doctor.experienceYears) }).map(
                    (_, i) => (
                      <FaStar key={i} color="#f5b50a" />
                    )
                  )}
                </div>

                <div className="text-secondary">
                  <FaClock /> {doctor.consultationTime?.start} -{" "}
                  {doctor.consultationTime?.end}
                </div>
                <div className="text-secondary">
                  <FaCalendarAlt /> {doctor.availableDays?.join(", ")}
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default Doctors;
