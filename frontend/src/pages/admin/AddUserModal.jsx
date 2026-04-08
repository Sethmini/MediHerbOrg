// src/components/admin/AddUserModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Grid,
  Box,
  Typography,
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../AxiosInstance";
import { toast } from "react-toastify";

function AddUserModal({ closeModal, reloadProfiles }) {
  const [formData, setFormData] = useState({
    useremail: "",
    password: "",
    role: "user",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    contact: "",
    gender: "male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const userRes = await api.post("/auth/register", {
        useremail: formData.useremail,
        password: formData.password,
        role: formData.role,
      });

      const userId =
        userRes.data._id ||
        userRes.data.user?._id ||
        userRes.data.user?.id ||
        userRes.data.userId ||
        userRes.data.id;

      if (!userId) throw new Error("User ID not returned from backend.");

      await api.post(`/user-profiles/${userId}`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        contact: formData.contact,
        gender: formData.gender,
      });

      toast.success("User created successfully!");
      reloadProfiles();
      closeModal();
    } catch (err) {
      console.error("Failed to create user:", err);
      toast.error(
        (err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message) ?? "Failed to create user"
      );
    }
  };

  return (
    <Dialog open onClose={closeModal} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Add New User
        <IconButton onClick={closeModal}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" color="success.main" mb={2}>
            Login Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="pharmacist">Pharmacist</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" color="success.main" mb={2}>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" color="success.main" mb={2}>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserModal;
