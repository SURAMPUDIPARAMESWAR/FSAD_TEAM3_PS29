import { useState, useRef } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  Alert
} from "@mui/material";

const studentsList = ["Raj Kumar", "Priya Sharma", "Amit Patel", "Neha Singh"];
const subjectsList = ["Math", "Science", "English", "History"];

function AddMarks() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    student: "",
    subject: "",
    examType: "",
    marksObtained: "",
    maxMarks: 100,
    examDate: "",
  });

  const [entries, setEntries] = useState([]);

  const percentage =
    formData.marksObtained && formData.maxMarks
      ? ((formData.marksObtained / formData.maxMarks) * 100).toFixed(1)
      : "";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.student || !formData.subject || !formData.examType) {
      alert("Please fill all required fields");
      return;
    }

    const newEntry = {
      ...formData,
      percentage,
    };

    setEntries([newEntry, ...entries]);

    alert("Marks added successfully!");

    setFormData({
      student: "",
      subject: "",
      examType: "",
      marksObtained: "",
      maxMarks: 100,
      examDate: "",
    });
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").slice(1);

      const parsedEntries = rows
        .map((row) => {
          const columns = row.split(",");
          if (columns.length < 6) return null;

          const [student, subject, examType, marksObtained, maxMarks, examDate] =
            columns;

          return {
            student: student?.trim(),
            subject: subject?.trim(),
            examType: examType?.trim(),
            marksObtained: Number(marksObtained),
            maxMarks: Number(maxMarks),
            examDate: examDate?.trim(),
            percentage: (
              (Number(marksObtained) / Number(maxMarks)) *
              100
            ).toFixed(1),
          };
        })
        .filter(Boolean);

      setEntries((prev) => [...parsedEntries, ...prev]);
      alert("CSV uploaded successfully!");
    };

    reader.readAsText(file);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Marks Management
            </Typography>
            <Typography color="text.secondary">
              Add and manage student examination marks
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="success"
            onClick={() => fileInputRef.current.click()}
          >
            Bulk Upload CSV
          </Button>

          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleCSVUpload}
          />
        </Box>

        <Grid container spacing={4}>
          {/* LEFT FORM */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add New Marks Entry
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Student *</InputLabel>
                    <Select
                      name="student"
                      value={formData.student}
                      label="Student *"
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select a student</MenuItem>
                      {studentsList.map((s, i) => (
                        <MenuItem key={i} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Subject *</InputLabel>
                    <Select
                      name="subject"
                      value={formData.subject}
                      label="Subject *"
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select subject</MenuItem>
                      {subjectsList.map((s, i) => (
                        <MenuItem key={i} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Exam Type *</InputLabel>
                    <Select
                      name="examType"
                      value={formData.examType}
                      label="Exam Type *"
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select type</MenuItem>
                      <MenuItem value="Midterm 1">Midterm 1</MenuItem>
                      <MenuItem value="Midterm 2">Midterm 2</MenuItem>
                      <MenuItem value="Lab Internal">Lab Internal</MenuItem>
                      <MenuItem value="Lab External">Lab External</MenuItem>
                      <MenuItem value="End Semester Exam">
                        End Semester Exam
                      </MenuItem>
                      <MenuItem value="Assignment">Assignment</MenuItem>
                      <MenuItem value="Quiz">Quiz</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Marks Obtained *"
                    name="marksObtained"
                    value={formData.marksObtained}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Maximum Marks *"
                    name="maxMarks"
                    value={formData.maxMarks}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Percentage"
                    value={percentage ? `${percentage}%` : "-"}
                    disabled
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    type="date"
                    name="examDate"
                    label="Exam Date *"
                    InputLabelProps={{ shrink: true }}
                    value={formData.examDate}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    + Add Marks Entry
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* RIGHT SIDE ENTRIES */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Entries
              </Typography>

              {entries.length === 0 ? (
                <Alert severity="info">No entries yet</Alert>
              ) : (
                entries.map((entry, index) => (
                  <Paper
                    key={index}
                    sx={{ p: 2, mb: 2, backgroundColor: "#f9fafb" }}
                  >
                    <Typography fontWeight="bold">
                      {entry.student}
                    </Typography>
                    <Typography variant="body2">
                      {entry.subject} - {entry.examType}
                    </Typography>
                    <Typography color="primary">
                      {entry.percentage}%
                    </Typography>
                  </Paper>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AddMarks;