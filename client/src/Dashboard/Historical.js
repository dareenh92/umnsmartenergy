import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

import { makeStyles } from "@material-ui/core/styles";

import Graph from "./Graph";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sectionHeader: {
    marginBottom: theme.spacing(2),
  },
}));

const Historical = () => {
  const classes = useStyles();

  const [logs_A, setLogs_A] = React.useState([]);
  const [logs_B, setLogs_B] = React.useState([]);

  // Get logs from server (HTTP API)
  const getLogs = (loggerID) => {
    // composing API's url
    let queryString =
      "http://localhost:3002/api/logs?lid=" +
      loggerID +
      "&date[after]=2020-11-06&date[before]=2020-11-12";

    fetch(queryString)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
        if (loggerID === "logger3") setLogs_A(data);
        else if (loggerID === "logger4") setLogs_B(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getLogs("logger3");
    getLogs("logger4");
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        color="primary"
        className={classes.sectionHeader}
      >
        Historical Data
        <IconButton
          variant="contained"
          color="primary"
          onClick={(event) => {
            getLogs("logger3");
            getLogs("logger4");
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Typography>
      <Typography variant="h6">Chart here</Typography>
      <Graph logs={logs_A} logs2={logs_B} />
    </div>
  );
};

export default Historical;
