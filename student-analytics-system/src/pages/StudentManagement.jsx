import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  Button,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from "@mui/material";

const initialStudents = [
  { roll: 101, name: "Raj Kumar", overall: 71.6, grade: "B", rank: 45, attendance: 85 },
  { roll: 102, name: "Priya Sharma", overall: 92.4, grade: "A+", rank: 1, attendance: 98 },
  { roll: 103, name: "Amit Patel", overall: 68.2, grade: "C", rank: 78, attendance: 75 },
  { roll: 104, name: "Neha Singh", overall: 35.8, grade: "F", rank: 186, attendance: 42 },
  { roll: 105, name: "Vikram Reddy", overall: 56.4, grade: "D", rank: 185, attendance: 68 },
];

function StudentManagement() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.roll.toString().includes(search);

    const matchesGrade =
      gradeFilter === "All" || student.grade === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  const handleDelete = (roll) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.roll !== roll));
      setSelectedStudent(null);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Student Management
            </Typography>
            <Typography color="text.secondary">
              Manage and view detailed student profiles
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/add-student")}
          >
            + Add New Student
          </Button>
        </Box>

        {/* SEARCH + FILTER */}
        <Grid container spacing={2} mt={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <Select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <MenuItem value="All">All Grades</MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="F">F</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* STUDENT CARDS */}
        <Grid container spacing={3} mt={2}>
          {filteredStudents.map((student) => (
            <Grid size={{ xs: 12, md: 4 }} key={student.roll}>
              <Card
                sx={{ cursor: "pointer" }}
                onClick={() => setSelectedStudent(student)}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>

                    <Box>
                      <Typography fontWeight="bold">
                        {student.name}
                      </Typography>
                      <Typography variant="body2">
                        Roll No: {student.roll}
                      </Typography>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Typography>Overall: {student.overall}%</Typography>
                    <Chip label={`Grade: ${student.grade}`} sx={{ mr: 1 }} />
                    <Typography>Rank: #{student.rank}</Typography>
                    <Typography>
                      Attendance: {student.attendance}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* PROFILE MODAL */}
        <Dialog
          open={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          fullWidth
          maxWidth="md"
        >
          {selectedStudent && (
            <>
              <DialogTitle>
                {selectedStudent.name} - Profile
              </DialogTitle>

              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography>Email: raj.kumar@school.com</Typography>
                    <Typography>Phone: +91 98765 43210</Typography>
                    <Typography>DOB: 2008-05-15</Typography>
                    <Typography>Class: 10th Grade</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography>
                      Overall: {selectedStudent.overall}%
                    </Typography>
                    <Typography>
                      Grade: {selectedStudent.grade}
                    </Typography>
                    <Typography>
                      Rank: #{selectedStudent.rank}
                    </Typography>
                    <Typography>
                      Attendance: {selectedStudent.attendance}%
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button
                  color="error"
                  onClick={() =>
                    handleDelete(selectedStudent.roll)
                  }
                >
                  Delete
                </Button>

                <Button
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Box>
  );
}

export default StudentManagement;