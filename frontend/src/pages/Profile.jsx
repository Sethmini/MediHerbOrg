import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Ayurveda Hospital – Patient Profile Management
 * ------------------------------------------------------------
 * - Fetches user profile from backend
 * - Shows elegant Ayurveda-themed UI
 * - Uses modals for creating and editing profiles
 * ------------------------------------------------------------
 */

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || user?._id;

  // Fetch profile on mount
  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user-profiles/user/${userId}`);
        if (res.data.profile) setProfile(res.data.profile);
        else setShowCreateModal(true);
      } catch (err) {
        if (err.response?.status === 404) setShowCreateModal(true);
        else setError(err.response?.data?.error || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleProfileCreated = (newProfile) => {
    setProfile(newProfile);
    setShowCreateModal(false);
  };

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowEditModal(false);
  };

  if (loading)
    return (
      <div className="text-center mt-5 text-success fs-4">Loading profile...</div>
    );

  if (error)
    return <div className="alert alert-danger mt-3 text-center">{error}</div>;

  return (
    <div
      className="container mt-5 p-4 rounded"
      style={{
        maxWidth: "700px",
        backgroundColor: "#f8f9f5",
        boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
        borderTop: "5px solid #3e8e41",
      }}
    >
      <h2
        className="mb-4 text-center fw-bold"
        style={{ color: "#3e8e41", fontFamily: "serif" }}
      >
        🌿 My Ayurvedic Profile
      </h2>

      {!profile ? (
        <div className="text-center p-4">
          <p className="text-muted fs-5">
            You don’t have a profile yet. Let’s begin your Ayurvedic journey.
          </p>
          <button
            className="btn btn-success px-4 py-2"
            onClick={() => setShowCreateModal(true)}
            style={{
              borderRadius: "20px",
              backgroundColor: "#3e8e41",
              borderColor: "#2e7d32",
            }}
          >
            Create My Profile
          </button>
        </div>
      ) : (
        <div
          className="card shadow border-0"
          style={{
            borderRadius: "15px",
            background: "#ffffff",
          }}
        >
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(90deg, #4CAF50, #8BC34A)",
              borderRadius: "15px 15px 0 0",
            }}
          >
            <h5 className="mb-0 text-center fw-bold">Registered User Details</h5>
          </div>
          <div className="card-body px-4 py-3">
            <ProfileField label="First Name" value={profile.first_name} />
            <ProfileField label="Last Name" value={profile.last_name} />
            <ProfileField
              label="Date of Birth"
              value={profile.date_of_birth?.split("T")[0]}
            />
            <ProfileField label="Address" value={profile.address} />
            <ProfileField label="Contact" value={profile.contact} />
            <ProfileField
              label="Gender"
              value={profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
            />

            <div className="text-center mt-4">
              <button
                className="btn btn-outline-success px-4 py-2"
                onClick={() => setShowEditModal(true)}
                style={{
                  borderRadius: "20px",
                  fontWeight: "500",
                  transition: "0.3s",
                }}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <ProfileModal
          title="🪷 Create Your Ayurvedic Profile"
          buttonText="Create Profile"
          onClose={() => setShowCreateModal(false)}
          userId={userId}
          onSubmitSuccess={handleProfileCreated}
          mode="create"
        />
      )}

      {/* Edit Modal */}
      {showEditModal && profile && (
        <ProfileModal
          title="🌼 Update Your Ayurvedic Profile"
          buttonText="Save Changes"
          onClose={() => setShowEditModal(false)}
          profile={profile}
          onSubmitSuccess={handleProfileUpdated}
          mode="edit"
        />
      )}
    </div>
  );
};

/**
 * Helper Component to display each profile field
 */
const ProfileField = ({ label, value }) => (
  <div className="d-flex justify-content-between align-items-center border-bottom py-2">
    <span className="text-muted">{label}</span>
    <span className="fw-semibold text-success">{value || "-"}</span>
  </div>
);

/**
 * Modal Component (Reusable for Create/Edit)
 */
const ProfileModal = ({
  title,
  buttonText,
  onClose,
  onSubmitSuccess,
  userId,
  profile,
  mode,
}) => {
  const [formData, setFormData] = useState(
    profile || {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      address: "",
      contact: "",
      gender: "",
    }
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let res;
      if (mode === "create")
        res = await axiosInstance.post(`/user-profiles/${userId}`, formData);
      else res = await axiosInstance.put(`/user-profiles/${profile._id}`, formData);

      onSubmitSuccess(res.data.profile);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content border-0 shadow-lg"
          style={{ borderRadius: "12px" }}
        >
          <div
            className="modal-header text-white"
            style={{
              background: "linear-gradient(90deg, #4CAF50, #8BC34A)",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <h5 className="modal-title fw-bold">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth?.split("T")[0] || ""}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="2"
                    placeholder="Enter your address"
                    required
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="modal-footer"
              style={{
                background: "#f1f8e9",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
            >
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success px-4"
                style={{ backgroundColor: "#3e8e41", borderRadius: "20px" }}
                disabled={loading}
              >
                {loading ? "Saving..." : buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
