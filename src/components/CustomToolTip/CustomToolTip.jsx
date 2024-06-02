import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTooltip({ user }) {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="body2" color="inherit">
        Name : {user?.name}
      </Typography>
      <Typography variant="body2" color="inherit">
        Email : {user?.email}
      </Typography>
      <Typography variant="body2" color="inherit">
        Phone : {user?.phone}
      </Typography>
    </Box>
  );
}

export default CustomTooltip;
