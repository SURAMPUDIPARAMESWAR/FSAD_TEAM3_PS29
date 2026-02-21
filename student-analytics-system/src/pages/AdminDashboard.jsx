import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import DashboardCard from "../components/DashboardCard";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  TextField,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

/* --- ALL YOUR DATA REMAINS SAME --- */
const students = [
  { roll: 101, name: "Raj Kumar", overall: 71.6, grade: "B", attendance: 85 },
  { roll: 102, name: "Priya Sharma", overall: 92.4, grade: "A+", attendance: 98 },
  { roll: 103, name: "Amit Patel", overall: 68.2, grade: "C", attendance: 75 },
  { roll: 104, name: "Neha Singh", overall: 35.8, grade: "F", attendance: 42 },
  { roll: 105, name: "Vikram Reddy", overall: 56.4, grade: "D", attendance: 68 },
];

const subjectDistribution = [
  { subject: "Math", excellent: 35, good: 40, average: 15, poor: 10 },
  { subject: "Science", excellent: 40, good: 35, average: 15, poor: 10 },
  { subject: "English", excellent: 30, good: 35, average: 20, poor: 15 },
  { subject: "History", excellent: 32, good: 38, average: 18, poor: 12 },
  { subject: "Geography", excellent: 28, good: 40, average: 20, poor: 12 },
];

const gradeDistribution = [
  { name: "A+", value: 25 },
  { name: "A", value: 25 },
  { name: "B", value: 29 },
  { name: "C", value: 18 },
  { name: "D", value: 11 },
  { name: "F", value: 7 },
];

const attendanceTrend = [
  { month: "Sep", attendance: 90 },
  { month: "Oct", attendance: 88 },
  { month: "Nov", attendance: 85 },
  { month: "Dec", attendance: 80 },
  { month: "Jan", attendance: 84 },
  { month: "Feb", attendance: 89 },
];

const COLORS = ["#22C55E", "#16A34A", "#F59E0B", "#EF4444", "#3B82F6", "#9333EA"];

function AdminDashboard() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = students.length;
  const classAverage =
    students.reduce((sum, s) => sum + s.overall, 0) / students.length;
  const passPercentage =
    (students.filter((s) => s.overall >= 40).length / students.length) * 100;

  const topPerformer = students.reduce((prev, curr) =>
    curr.overall > prev.overall ? curr : prev
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Complete overview of student performance and analytics
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Total Students" value={totalStudents} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="Class Average"
              value={`${classAverage.toFixed(1)}%`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard title="Top Performer" value={topPerformer.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard
              title="Pass Percentage"
              value={`${passPercentage.toFixed(1)}%`}
            />
          </Grid>
        </Grid>

        {/* Charts */}
        <Box mt={5}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Subject-wise Performance Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="excellent" stackId="a" fill="#22C55E" />
                <Bar dataKey="good" stackId="a" fill="#16A34A" />
                <Bar dataKey="average" stackId="a" fill="#F59E0B" />
                <Bar dataKey="poor" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Grade Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Class Attendance Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#2563EB" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Student Table */}
        <Paper sx={{ p: 3, mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Student Performance List
          </Typography>

          <TextField
            fullWidth
            label="Search by name..."
            variant="outlined"
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Overall %</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Attendance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.roll}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.overall}%</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
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

export default AdminDashboard;