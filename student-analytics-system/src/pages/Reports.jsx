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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---- DATA (UNCHANGED) ---- */
const examData = {
  "Midterm 1": [
    { name: "Rahul", Math: 75, Science: 68, English: 80, History: 64 },
    { name: "Anjali", Math: 70, Science: 72, English: 78, History: 69 },
    { name: "Vikram", Math: 85, Science: 82, English: 88, History: 75 },
    { name: "Sneha", Math: 55, Science: 50, English: 60, History: 58 },
  ],
  "Midterm 2": [
    { name: "Rahul", Math: 85, Science: 78, English: 88, History: 74 },
    { name: "Anjali", Math: 75, Science: 82, English: 81, History: 69 },
    { name: "Vikram", Math: 90, Science: 92, English: 85, History: 80 },
    { name: "Sneha", Math: 60, Science: 55, English: 70, History: 65 },
  ],
  "End Semester Exam": [
    { name: "Rahul", Math: 90, Science: 85, English: 92, History: 84 },
    { name: "Anjali", Math: 80, Science: 88, English: 85, History: 79 },
    { name: "Vikram", Math: 95, Science: 94, English: 90, History: 88 },
    { name: "Sneha", Math: 65, Science: 60, English: 75, History: 70 },
  ],
};

const subjects = ["Math", "Science", "English", "History"];

function Reports() {
  const [selectedExam, setSelectedExam] = useState("Midterm 1");

  const students = examData[selectedExam];

  const subjectAverages = subjects.map((subject) => {
    const avg =
      students.reduce((sum, s) => sum + s[subject], 0) /
      students.length;

    return { subject, average: avg.toFixed(1) };
  });

  const classAverage =
    students.reduce((sum, s) => {
      const total =
        subjects.reduce((subSum, sub) => subSum + s[sub], 0) /
        subjects.length;
      return sum + total;
    }, 0) / students.length;

  const passCount = students.filter((student) =>
    subjects.every((sub) => student[sub] >= 40)
  ).length;

  const passPercentage = (
    (passCount / students.length) *
    100
  ).toFixed(1);

  const topPerformer = students.reduce((prev, curr) => {
    const prevAvg =
      subjects.reduce((sum, sub) => sum + prev[sub], 0) /
      subjects.length;
    const currAvg =
      subjects.reduce((sum, sub) => sum + curr[sub], 0) /
      subjects.length;

    return currAvg > prevAvg ? curr : prev;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Class Performance Report
        </Typography>

        {/* Exam Selector */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Exam Type
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Exam</InputLabel>
            <Select
              value={selectedExam}
              label="Exam"
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              {Object.keys(examData).map((exam, index) => (
                <MenuItem key={index} value={exam}>
                  {exam}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard
              title="Class Average"
              value={`${classAverage.toFixed(1)}%`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              title="Pass Percentage"
              value={`${passPercentage}%`}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              title="Top Performer"
              value={topPerformer.name}
            />
          </Grid>
        </Grid>

        {/* Chart */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {selectedExam} Subject Averages
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectAverages}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Detailed Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Student Performance Table
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  {subjects.map((sub, i) => (
                    <TableCell key={i}>{sub}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    {subjects.map((sub, i) => (
                      <TableCell key={i}>
                        {student[sub]}
                      </TableCell>
                    ))}
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

export default Reports;