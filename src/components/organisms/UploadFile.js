import {
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import FolderIcon from "@material-ui/icons/Folder";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { DETAILS_ROUTE } from "../../routes";

const UploadFile = () => {
  const height = 271;
  const svgString = `<svg width="603" height="${height}" viewBox="0 0 603 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5"  width="602" height="${
    height - 1
  }" rx="3.5" fill="#FAFDFF" stroke="#99ACC2" stroke-dasharray="12 12"/></svg>`;

  const useStyles = makeStyles({
    body: {
      background: "#FAFDFF",
      height: "calc(100vh - 92px)",
      display: "flex",
      justifyContent: "center",
      paddingTop: "32px",
    },
    parentGrid: {
      height: height + "px",
      width: "603px",
      background: "#FAFDFF",
      borderRadius: "4px",
      backgroundImage: `url("data:image/svg+xml;base64,${btoa(svgString)}")`,
      flexDirection: "column",
      alignItems: "center",
      padding: "1px",
    },
    iconGrid: {
      paddingTop: "24px",
    },
    text: {
      fontWeight: 400,
      lineHeight: "24px",
    },
    text1Grid: {
      paddingTop: "20px",
    },
    text2Grid: {
      paddingTop: "2px",
      paddingBottom: "6px",
    },
    linkLabel: {
      cursor: "pointer",
    },
    errorGrid: {
      background: "#F9EBED",
      width: "601px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "2px",
    },
    root: {
      height: "604px",
      width: "1240px",
      borderRadius: "12px",
      boxShadow: "0px 3px 3px 2px rgba(0, 0, 0, 0.03)",
      border: "1px solid #69A6E3",
    },
    parentGrid1: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    topText1: {
      fontWeight: 500,
      lineHeight: "36px",
      padding: "20px",
      color: "#33475B",
    },
    topText2: {
      fontWeight: 400,
      lineHeight: "24px",
    },
  });
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = React.useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const extension = file?.name?.substring(file?.name?.lastIndexOf("."));
    if (extension !== ".csv") {
      setErrorMsg("Invalid file. Please upload a csv file");
    } else {
      uploadFile(file);
    }
  };

  const handleFileDropEvent = (event) => {
    event.preventDefault();
    fileInputRef.current.files = event.dataTransfer.files;
    const file = event.dataTransfer.files[0];
    const extension = file?.name?.substring(file?.name?.lastIndexOf("."));
    if (extension !== "csv") {
      fileInputRef.current.value = "";
      setErrorMsg("Invalid file. Please upload a csv file");
    } else {
      uploadFile(file);
    }
    setDragOver(false);
  };

  const uploadFile = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        navigate(DETAILS_ROUTE, {
          state: {
            data: result.data,
          },
        });
      },
    });
    fileInputRef.current.value = "";
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!dragOver) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  return (
    <>
      <Grid direction="column">
        <Grid item className={classes.body}>
          <Paper className={classes.root}>
            <Grid container className={classes.parentGrid1}>
              <Grid item>
                <Typography variant="h4" className={classes.topText1}>
                  Upload a CSV file
                </Typography>
              </Grid>
              <Grid
                item
                onDrop={handleFileDropEvent}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Grid container className={classes.parentGrid}>
                  {errorMsg && (
                    <Grid item className={classes.errorGrid}>
                      <Typography variant="caption" textColor={"#F2545B"}>
                        {errorMsg}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item className={classes.iconGrid}>
                    <FolderIcon
                      size="large"
                      style={{
                        width: "95px",
                        height: "95px",
                        color: "#3C97E2",
                      }}
                    />
                  </Grid>
                  <Grid item className={classes.text1Grid}>
                    <Typography
                      variant="body1"
                      className={classes.text}
                      textColor={"#33475B"}
                    >
                      Simply drop your file here to get started
                    </Typography>
                  </Grid>
                  <Grid item className={classes.text2Grid}>
                    <Typography
                      variant="body1"
                      className={classes.text}
                      textColor={"#5C6C7C"}
                    >
                      or
                    </Typography>
                  </Grid>
                  <Grid item>
                    <InputLabel className={classes.linkLabel}>
                      <Typography
                        variant="body1"
                        className={classes.text}
                        textColor="#056AD0"
                      >
                        Browse files
                      </Typography>
                      <input
                        type="file"
                        accept={".csv"}
                        onChange={(event) => {
                          handleFileChange(event);
                        }}
                        ref={fileInputRef}
                        hidden
                      />
                    </InputLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UploadFile;
