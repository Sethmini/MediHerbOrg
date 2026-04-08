import React, { useEffect, useState } from "react";
import api from "../../AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import "./styles/UserManagement.css";
import { FaUser, FaUserShield, FaUserNurse } from "react-icons/fa";

function UserManagement() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  /** Load profiles */
  const loadProfiles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user-profiles");
      const profilesData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.profiles)
        ? res.data.profiles
        : [];

      const formattedProfiles = profilesData.map((p) => ({
        _id: p._id,
        first_name: p.first_name || "",
        last_name: p.last_name || "",
        date_of_birth: p.date_of_birth || "",
        address: p.address || "",
        contact: p.contact || "",
        gender: p.gender || "",
        user: {
          _id: p.user?._id || p.userId || "",
          useremail: p.user?.useremail || p.useremail || "",
          role: p.user?.role || p.role || "",
        },
      }));

      setProfiles(formattedProfiles);
      setFilteredProfiles(formattedProfiles);
    } catch (err) {
      console.error("Failed to load profiles:", err);
      toast.error("Failed to load profiles");
      setProfiles([]);
      setFilteredProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  /** Handle search and filter */
  useEffect(() => {
    let temp = [...profiles];

    if (roleFilter !== "all") {
      temp = temp.filter((p) => p.user.role === roleFilter);
    }

    if (searchQuery.trim()) {
      temp = temp.filter(
        (p) =>
          p.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProfiles(temp);
  }, [searchQuery, roleFilter, profiles]);

  /** Delete user and profile */
  const handleDelete = async (profile) => {
    const userId = profile.user?._id || profile.userId || profile._id;
    const profileId = profile._id;

    if (!userId || !profileId) {
      toast.error("Cannot determine user or profile ID to delete.");
      return;
    }

    const result = await Swal.fire({
      title: "Delete User?",
      text: "This will permanently delete the user and their profile.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-4 shadow-lg",
        confirmButton: "btn btn-success px-4 py-2 rounded-pill",
        cancelButton: "btn btn-secondary px-4 py-2 rounded-pill ms-2",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/auth/delete/${userId}`);
      await api.delete(`/user-profiles/${profileId}`);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The user and profile were successfully deleted.",
        confirmButtonColor: "#28a745",
        timer: 2000,
        showConfirmButton: false,
      });

      loadProfiles();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong while deleting the user.",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  /** Role badge with icon (compact) */
  const renderRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="badge bg-danger d-inline-flex align-items-center px-2 py-1 rounded-pill">
            <FaUserShield className="me-1" size={14} /> Admin
          </span>
        );
      case "user":
        return (
          <span className="badge bg-success d-inline-flex align-items-center px-2 py-1 rounded-pill">
            <FaUser className="me-1" size={14} /> User
          </span>
        );
      case "pharmacist":
        return (
          <span className="badge bg-warning text-dark d-inline-flex align-items-center px-2 py-1 rounded-pill">
            <FaUserNurse className="me-1" size={14} /> Pharmacist
          </span>
        );
      default:
        return <span className="badge bg-secondary">{role}</span>;
    }
  };

  return (
    <div className="container-fluid py-4 user-management">
      <ToastContainer position="top-right" style={{ marginTop: "50px" }} />

      <div className="text-center mb-5">
        <h2 className="fw-bold text-success mb-1">User Management Dashboard</h2>
        <p className="text-muted fs-6">
          Manage all registered users and their profiles efficiently.
        </p>
      </div>

      {/* Search, Filter, Add User - same line */}
      <div className="d-flex align-items-center gap-3 flex-wrap">
        {/* Search Input */}
        <div className="flex-grow-1" style={{ minWidth: "250px", maxWidth: "400px" }}>
          <div className="input-group shadow-sm rounded-pill overflow-hidden">
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-0"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: 0 }}
            />
          </div>
        </div>

        {/* Role Filter */}
        <div style={{ minWidth: "180px" }}>
          <select
            className="form-select shadow-sm rounded-pill"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="pharmacist">Pharmacist</option>
          </select>
        </div>

        {/* Add User Button */}
        <button
          className="btn btn-success rounded-pill shadow-sm d-flex align-items-center"
          style={{ whiteSpace: "nowrap" }}
          onClick={() => setShowAddModal(true)}
        >
          <i className="bi bi-person-plus me-2"></i> Add New User
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 mt-4">
        <div className="card-header bg-light fw-semibold text-success d-flex align-items-center">
          <i className="bi bi-people me-2 fs-5"></i> User List
        </div>

        <div className="card-body table-responsive p-0">
          {loading ? (
            <div className="loading-container py-5">
              <div className="spinner-border text-success" role="status"></div>
              <p className="text-muted mt-3">Loading users...</p>
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0">
              <thead className="table-success text-center">
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map((p) => (
                    <tr key={p._id} className="table-row-hover text-center">
                      <td>{p.user.useremail}</td>
                      <td>{renderRoleBadge(p.user.role)}</td>
                      <td>
                        {p.first_name} {p.last_name}
                      </td>
                      <td>{p.date_of_birth ? new Date(p.date_of_birth).toLocaleDateString() : "-"}</td>
                      <td>{p.address}</td>
                      <td>{p.contact}</td>
                      <td>{p.gender}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => setEditProfile(p)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      <i className="bi bi-emoji-frown fs-4"></i>
                      <p className="mt-2 mb-0">No profiles found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && <AddUserModal closeModal={() => setShowAddModal(false)} reloadProfiles={loadProfiles} />}

      {/* Edit User Modal */}
      {editProfile && <EditUserModal profile={editProfile} closeModal={() => setEditProfile(null)} reloadProfiles={loadProfiles} />}
    </div>
  );
}

export default UserManagement;
