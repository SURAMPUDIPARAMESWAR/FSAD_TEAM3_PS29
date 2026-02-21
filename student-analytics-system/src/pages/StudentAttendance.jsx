import StudentSidebar from "../components/StudentSidebar";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert
} from "@mui/material";

/* ===== SAME DATA ===== */
const attendanceData = {
  Math: [
    { date: "2026-02-01", status: "Present" },
    { date: "2026-02-02", status: "Absent" },
    { date: "2026-02-05", status: "Present" },
    { date: "2026-02-10", status: "Present" },
  ],
  Science: [
    { date: "2026-02-01", status: "Present" },
    { date: "2026-02-03", status: "Present" },
    { date: "2026-02-06", status: "Absent" },
  ],
  English: [
    { date: "2026-02-02", status: "Present" },
    { date: "2026-02-04", status: "Present" },
    { date: "2026-02-06", status: "Present" },
  ],
};

function StudentAttendance() {
  const [selectedSubject, setSelectedSubject] = useState("Math");

  const allRecords = Object.values(attendanceData).flat();
  const overallPresent = allRecords.filter(
    (r) => r.status === "Present"
  ).length;

  const overallPercentage = (
    (overallPresent / allRecords.length) *
    100
  ).toFixed(1);

  const subjectRecords = [...attendanceData[selectedSubject]].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const totalClasses = subjectRecords.length;
  const presentCount = subjectRecords.filter(
    (r) => r.status === "Present"
  ).length;

  const subjectPercentage = (
    (presentCount / totalClasses) *
    100
  ).toFixed(1);

  return (
    <Box sx={{ display: "flex" }}>
      <StudentSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Attendance Dashboard
        </Typography>

        <Typography color="text.secondary" mb={4}>
          View subject-wise attendance records
        </Typography>

        {/* OVERALL SUMMARY */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Overall Attendance
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color:
                    overallPercentage < 75
                      ? "error.main"
                      : "success.main",
                }}
              >
                {overallPercentage}%
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Total Classes
              </Typography>
              <Typography variant="h5">
                {allRecords.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Total Present
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "success.main" }}
              >
                {overallPresent}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* SUBJECT SELECTOR */}
        <Box mt={4} sx={{ width: 250 }}>
          <FormControl fullWidth>
            <Select
              value={selectedSubject}
              onChange={(e) =>
                setSelectedSubject(e.target.value)
              }
            >
              {Object.keys(attendanceData).map(
                (subject) => (
                  <MenuItem
                    key={subject}
                    value={subject}
                  >
                    {subject}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>

        {/* SUBJECT SUMMARY */}
        <Grid container spacing={3} mt={1}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                {selectedSubject} Attendance
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color:
                    subjectPercentage < 75
                      ? "error.main"
                      : "success.main",
                }}
              >
                {subjectPercentage}%
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Classes Conducted
              </Typography>
              <Typography variant="h5">
                {totalClasses}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Present
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "success.main" }}
              >
                {presentCount}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* ATTENDANCE TABLE */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {selectedSubject} - Class Records
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subjectRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        color={
                          record.status === "Present"
                            ? "success"
                            : "error"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* LOW ATTENDANCE ALERT */}
        {subjectPercentage < 75 && (
          <Alert
            severity="warning"
            sx={{ mt: 3 }}
          >
            Your attendance in {selectedSubject} is below
            75%. Please improve.
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default StudentAttendance;