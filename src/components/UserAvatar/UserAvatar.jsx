import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import CustomTooltip from "../CustomToolTip/CustomToolTip";

function UserAvatar({ user }) {
  return (
    <Tooltip
      title={<CustomTooltip user={user} />}
      arrow
      sx={{
        "& .MuiTooltip-tooltip": {
          bgcolor: "common.black",
          color: "common.white",
          boxShadow: 1,
          fontSize: 11,
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#09c4f394",
          color: "#fff",
          width: 45,
          height: 45,
          border: "2px solid #fff",
          cursor: "pointer",
          fontSize:"16px"
        }}
      >
        {user?.name[0]}
      </Avatar>
    </Tooltip>
  );
}

export default UserAvatar;
