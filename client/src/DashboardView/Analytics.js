import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Graph from "./Graph";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  graphContainer: {
    minHeight: "250px",
    maxHeight: "350px",
  },
  graphPanel: {
    height: "100%",
    padding: theme.spacing(2),
  },
}));

const Analytics = () => {
  const classes = useStyles();

  const [logs_A, setLogs_A] = React.useState([]);
  const [logs_B, setLogs_B] = React.useState([]);

  const [startDate, handleStartDateChange] = useState(new Date());
  const [endDate, handleEndDateChange] = useState(new Date());

  const [loggersChecked, setChecked] = React.useState({
    logger3: true,
    logger4: true,
  });
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

  const handleButtonClick = () => {
    getLogs("logger3");
    getLogs("logger4");
  };

  const handleCheckbox = (event) => {
    setChecked({
      ...loggersChecked,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <Typography
        variant="h5"
        color="primary"
        className={classes.sectionHeader}
      >
        Analytics
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
      <Grid container spacing={2} direction="column">
        {/* Temperature */}
        <Grid container item spacing={2} className={classes.graphContainer}>
          <Grid item xs={8}>
            <Typography color="primary">Temperature</Typography>
            <Divider />
            <Graph metric="temperature" logs={logs_A} logs2={logs_B} />
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.graphPanel}>
              <Typography variant="h6" color="primary">
                Filter
              </Typography>
              <Typography>From</Typography>
              <KeyboardDatePicker
                autoOk
                format="dd MMM yyyy"
                value={startDate}
                onChange={(date) => handleStartDateChange(date)}
              />
              <Typography>to</Typography>
              <KeyboardDatePicker
                autoOk
                format="dd MMM yyyy"
                value={endDate}
                onChange={(date) => handleEndDateChange(date)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
              >
                Filter
              </Button>
            </Paper>
          </Grid>
        </Grid>
        {/* Humidity */}
        {/* <Grid container item spacing={2} className={classes.graphContainer}>
          <Grid item xs={8}>
            <Typography color="primary">Humidity</Typography>
            <Divider />
            <Graph metric="humidity" logs={logs_A} logs2={logs_B} />
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.graphPanel}>
              <Typography variant="h6" color="primary">
                Filter
              </Typography>
            </Paper>
          </Grid>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Analytics;
