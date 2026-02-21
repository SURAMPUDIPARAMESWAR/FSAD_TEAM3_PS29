import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

function AddStudent() {
  const [students, setStudents] = useState([
    { name: "Rahul", roll: "101", className: "10A" },
    { name: "Anjali", roll: "102", className: "10A" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    className: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = () => {
    if (
      formData.name.trim() !== "" &&
      formData.roll.trim() !== "" &&
      formData.className.trim() !== ""
    ) {
      setStudents([...students, formData]);
      setFormData({ name: "", roll: "", className: "" });
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Add Student
        </Typography>

        {/* Add Student Form */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Student Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Roll Number"
                name="roll"
                value={formData.roll}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Class"
                name="className"
                value={formData.className}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                onClick={handleAddStudent}
                sx={{ mt: 1 }}
              >
                Add Student
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Existing Students List */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Existing Students
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Class</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.roll}</TableCell>
                    <TableCell>{student.className}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}

export default AddStudent;