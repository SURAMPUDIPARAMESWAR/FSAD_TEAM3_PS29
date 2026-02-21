import { Card, CardContent, Typography } from "@mui/material";

function DashboardCard({ title, value }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;