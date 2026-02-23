import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

function EditStudent() {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state;

  const [formData, setFormData] = useState(student);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Student updated successfully!");
    navigate("/student-management");
  };

  if (!student) return <Typography>No student data found</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>
          Edit Student
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Attendance"
          name="attendance"
          type="number"
          value={formData.attendance}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
}

export default EditStudent;