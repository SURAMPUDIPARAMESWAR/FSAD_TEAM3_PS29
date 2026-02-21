import AdminSidebar from "../components/AdminSidebar";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from "@mui/material";

const studentsAttendance = [
  {
    name: "Rahul",
    Math: 90,
    Science: 75,
    English: 95,
    History: 60,
  },
  {
    name: "Anjali",
    Math: 85,
    Science: 70,
    English: 88,
    History: 65,
  },
  {
    name: "Sneha",
    Math: 60,
    Science: 55,
    English: 50,
    History: 40,
  },
];

function AdminAttendance() {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Overall Student Attendance
        </Typography>

        <Paper sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Math</strong></TableCell>
                  <TableCell><strong>Science</strong></TableCell>
                  <TableCell><strong>English</strong></TableCell>
                  <TableCell><strong>History</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {studentsAttendance.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>

                    <TableCell>
                      <Chip
                        label={`${student.Math}%`}
                        color={
                          student.Math >= 75
                            ? "success"
                            : student.Math >= 50
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`${student.Science}%`}
                        color={
                          student.Science >= 75
                            ? "success"
                            : student.Science >= 50
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`${student.English}%`}
                        color={
                          student.English >= 75
                            ? "success"
                            : student.English >= 50
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`${student.History}%`}
                        color={
                          student.History >= 75
                            ? "success"
                            : student.History >= 50
                            ? "warning"
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
      </Box>
    </Box>
  );
}

export default AdminAttendance;