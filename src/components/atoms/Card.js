import React from "react";
import { Card as MuiCard, Typography } from "@material-ui/core";
import { CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const Card = ({ title, width, height, background, body, action }) => {
  const useStyles = makeStyles({
    root: {
      height: height,
      width: width,
      borderRadius: "8px",
      background: background,
      border: "1px solid #69A6E3",
      boxShadow: "0px 3px 3px 2px rgba(0, 0, 0, 0.03)",
      "&:hover": {
        border: "1px solid #69A6E3",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      },
      margin: "8px",
    },
    header: {
      height: "38px",
      backgroundColor: "#F3F9FF",
      border: "1px solid #DFE3EB",
    },
  });

  const classes = useStyles();

  return (
    <MuiCard className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<InfoOutlinedIcon />}
        title={<Typography variant="h6">{title}</Typography>}
        action={action}
      />
      <CardContent style={{ padding: "16px" }}>{body}</CardContent>
    </MuiCard>
  );
};

export default Card;
