import { useEffect, useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import DashboardCard from "../components/DashboardCard";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
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

const studentName = "Raj";

/* ---- DATA (UNCHANGED) ---- */
const subjectData = [
  { subject: "Math", midterm: 75, final: 80, assignments: 78 },
  { subject: "Science", midterm: 82, final: 88, assignments: 85 },
  { subject: "English", midterm: 60, final: 68, assignments: 66 },
  { subject: "History", midterm: 70, final: 74, assignments: 72 },
  { subject: "Geography", midterm: 55, final: 60, assignments: 58 },
];

const radarData = [
  { subject: "Math", yourScore: 80, classAvg: 75 },
  { subject: "Science", yourScore: 88, classAvg: 82 },
  { subject: "English", yourScore: 68, classAvg: 72 },
  { subject: "History", yourScore: 74, classAvg: 70 },
  { subject: "Geography", yourScore: 60, classAvg: 65 },
];

const trendData = [
  { month: "Sep", percentage: 72 },
  { month: "Oct", percentage: 74 },
  { month: "Nov", percentage: 76 },
  { month: "Dec", percentage: 68 },
  { month: "Jan", percentage: 78 },
  { month: "Feb", percentage: 80 },
];

function StudentDashboard() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const allSuggestions =
      JSON.parse(localStorage.getItem("suggestions")) || [];

    const mySuggestions = allSuggestions.filter(
      (item) => item.student === studentName
    );

    setSuggestions(mySuggestions);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <StudentSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Welcome back, {studentName}! 👋
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Here's a comprehensive overview of your academic journey
        </Typography>

        {/* SUMMARY CARDS */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Overall Percentage" value="71.6%" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Current Grade" value="B" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Class Rank" value="#45" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Attendance" value="85%" />
          </Grid>
        </Grid>

        {/* SUBJECT PERFORMANCE */}
        <Paper sx={{ p: 3, mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Subject Performance
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="midterm" fill="#F59E0B" />
              <Bar dataKey="final" fill="#2563EB" />
              <Bar dataKey="assignments" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* RADAR + TREND */}
        <Grid container spacing={4} mt={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Skills Comparison vs Class Average
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Your Score"
                    dataKey="yourScore"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Class Average"
                    dataKey="classAvg"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.4}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            6-Month Performance Trend
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* STRONG & WEAK AREAS */}
        <Grid container spacing={3} mt={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Strong Areas</Typography>
              <Typography color="success.main">
                Science - 88%
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Needs Improvement</Typography>
              <Typography color="error.main">
                Geography - 60%
              </Typography>
              <Typography color="error.main">
                English - 68%
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Upcoming Tasks</Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Calculus Assignment - Mar 15" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Physics Lab Report - Mar 18" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Essay Writing - Mar 20" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* IMPROVEMENT PLAN */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Personalized Improvement Plan
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Focus on Geography problem-solving practice." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Practice English grammar exercises daily." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Maintain excellent performance in Science." />
            </ListItem>
          </List>
        </Paper>

        {/* ADMIN SUGGESTIONS */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Suggestions from Admin
          </Typography>

          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <Typography key={index} sx={{ mb: 1 }}>
                {item.text}
              </Typography>
            ))
          ) : (
            <Typography color="text.secondary">
              No suggestions received yet.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default StudentDashboard;