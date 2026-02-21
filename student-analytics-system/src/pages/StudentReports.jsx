import { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";

/* ---- ALL YOUR DATA REMAINS SAME ---- */
const studentName = "Rahul";

const trendData = [
  { month: "Sep", yourScore: 72, classAvg: 75, topper: 88 },
  { month: "Oct", yourScore: 74, classAvg: 76, topper: 90 },
  { month: "Nov", yourScore: 76, classAvg: 77, topper: 91 },
  { month: "Dec", yourScore: 70, classAvg: 74, topper: 89 },
  { month: "Jan", yourScore: 78, classAvg: 79, topper: 93 },
  { month: "Feb", yourScore: 80, classAvg: 81, topper: 94 },
];

const examTypeData = {
  "Midterm 1": [
    { subject: "Math", marks: 75 },
    { subject: "Science", marks: 68 },
    { subject: "English", marks: 60 },
    { subject: "History", marks: 70 },
  ],
  "Midterm 2": [
    { subject: "Math", marks: 85 },
    { subject: "Science", marks: 78 },
    { subject: "English", marks: 72 },
    { subject: "History", marks: 74 },
  ],
  "End Semester": [
    { subject: "Math", marks: 90 },
    { subject: "Science", marks: 88 },
    { subject: "English", marks: 80 },
    { subject: "History", marks: 84 },
  ],
  "Lab Internal": [
    { subject: "Physics Lab", marks: 45 },
    { subject: "Chemistry Lab", marks: 42 },
  ],
};

const radarData = [
  { subject: "Math", score: 80, target: 85 },
  { subject: "Science", score: 88, target: 90 },
  { subject: "English", score: 65, target: 75 },
  { subject: "History", score: 72, target: 78 },
  { subject: "Geography", score: 58, target: 70 },
];

const testData = [
  { test: "Test 1", score: 70 },
  { test: "Test 2", score: 73 },
  { test: "Test 3", score: 75 },
  { test: "Test 4", score: 77 },
  { test: "Test 5", score: 80 },
];

function StudentReports() {
  const [selectedExam, setSelectedExam] = useState("Last Month");
  const [comparisonType, setComparisonType] = useState("classAvg");
  const [selectedExamType, setSelectedExamType] = useState("Midterm 1");

  return (
    <Box sx={{ display: "flex" }}>
      <StudentSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Advanced Performance Analytics
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Deep insights and predictive analysis of your academic journey
        </Typography>

        {/* Top Filter */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <FormControl size="small">
            <Select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              <MenuItem value="Last Month">Last Month</MenuItem>
              <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
              <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained">
            Export Report
          </Button>
        </Box>

        {/* Trend Chart */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              Performance Trend Analysis
            </Typography>

            <FormControl size="small" sx={{ width: 220 }}>
              <Select
                value={comparisonType}
                onChange={(e) => setComparisonType(e.target.value)}
              >
                <MenuItem value="classAvg">
                  Compare with Class Average
                </MenuItem>
                <MenuItem value="topper">
                  Compare with Class Topper
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="yourScore"
                stroke="#2563EB"
                strokeWidth={3}
                name="Your Score"
              />

              <Line
                type="monotone"
                dataKey={comparisonType}
                stroke={
                  comparisonType === "classAvg"
                    ? "#10B981"
                    : "#F59E0B"
                }
                strokeWidth={3}
                name={
                  comparisonType === "classAvg"
                    ? "Class Average"
                    : "Class Topper"
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* Radar + Test Performance */}
        <Grid container spacing={4} mt={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Multi-Dimensional Subject Analysis
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    dataKey="score"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.6}
                  />
                  <Radar
                    dataKey="target"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Test-by-Test Performance
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={testData}>
                  <XAxis dataKey="test" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Exam Type Wise */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              Exam Type Wise Result Analysis
            </Typography>

            <FormControl size="small" sx={{ width: 220 }}>
              <Select
                value={selectedExamType}
                onChange={(e) =>
                  setSelectedExamType(e.target.value)
                }
              >
                {Object.keys(examTypeData).map((exam, index) => (
                  <MenuItem key={index} value={exam}>
                    {exam}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examTypeData[selectedExamType]}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marks" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* AI Prediction Table */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            AI-Powered Performance Predictions
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Current Score</TableCell>
                  <TableCell>Predicted</TableCell>
                  <TableCell>Confidence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Math</TableCell>
                  <TableCell>80%</TableCell>
                  <TableCell sx={{ color: "success.main" }}>
                    85%
                  </TableCell>
                  <TableCell>High</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Science</TableCell>
                  <TableCell>88%</TableCell>
                  <TableCell sx={{ color: "success.main" }}>
                    90%
                  </TableCell>
                  <TableCell>High</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>English</TableCell>
                  <TableCell>65%</TableCell>
                  <TableCell sx={{ color: "warning.main" }}>
                    70%
                  </TableCell>
                  <TableCell>Medium</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Geography</TableCell>
                  <TableCell>58%</TableCell>
                  <TableCell sx={{ color: "error.main" }}>
                    62%
                  </TableCell>
                  <TableCell>Low</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Performance Insights */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Comprehensive Performance Insights
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            Excellent Progress in Science
          </Alert>

          <Alert severity="error" sx={{ mb: 2 }}>
            Critical: English below threshold
          </Alert>

          <Alert severity="warning">
            Geography showing declining trend
          </Alert>
        </Paper>
      </Box>
    </Box>
  );
}

export default StudentReports;