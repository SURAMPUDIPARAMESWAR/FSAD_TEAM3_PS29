import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import DashboardCard from "../components/DashboardCard";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* -------- DATA (UNCHANGED) -------- */
const students = [
  {
    name: "Rahul",
    marks: [
      { subject: "Math", value: 85 },
      { subject: "Science", value: 78 },
      { subject: "English", value: 92 },
      { subject: "History", value: 74 },
    ],
  },
  {
    name: "Anjali",
    marks: [
      { subject: "Math", value: 60 },
      { subject: "Science", value: 55 },
      { subject: "English", value: 70 },
      { subject: "History", value: 65 },
    ],
  },
  {
    name: "Vikram",
    marks: [
      { subject: "Math", value: 90 },
      { subject: "Science", value: 92 },
      { subject: "English", value: 85 },
      { subject: "History", value: 80 },
    ],
  },
];

function AdminStudentInsights() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [suggestion, setSuggestion] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const average =
    selectedStudent.marks.reduce((sum, sub) => sum + sub.value, 0) /
    selectedStudent.marks.length;

  const weakSubjects = selectedStudent.marks.filter(
    (sub) => sub.value < 40
  );

  const handleSendSuggestion = () => {
    if (suggestion.trim() !== "") {
      const existingSuggestions =
        JSON.parse(localStorage.getItem("suggestions")) || [];

      const newSuggestion = {
        student: selectedStudent.name,
        text: suggestion,
      };

      localStorage.setItem(
        "suggestions",
        JSON.stringify([...existingSuggestions, newSuggestion])
      );

      setSuggestion("");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Student Insights & Comparison
        </Typography>

        {/* Student Selection */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Student
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Student</InputLabel>
            <Select
              value={selectedStudent.name}
              label="Student"
              onChange={(e) =>
                setSelectedStudent(
                  students.find((s) => s.name === e.target.value)
                )
              }
            >
              {students.map((student, index) => (
                <MenuItem key={index} value={student.name}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Summary Cards */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard
              title="Average Score"
              value={`${average.toFixed(1)}%`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard
              title="Weak Subjects"
              value={
                weakSubjects.length > 0
                  ? weakSubjects.map((s) => s.subject).join(", ")
                  : "None"
              }
            />
          </Grid>
        </Grid>

        {/* Performance Chart */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {selectedStudent.name}'s Performance
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={selectedStudent.marks}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Suggestion Box */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Send Suggestion
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write improvement suggestion..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            onClick={handleSendSuggestion}
          >
            Send Suggestion
          </Button>
        </Paper>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success" variant="filled">
            Suggestion sent successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AdminStudentInsights;