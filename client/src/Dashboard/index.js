import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import LiveReading from "./LiveReading";
import Historical from "./Historical";

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div id="dashboardContent">
      {/* <LiveReading /> */}
      <Historical />
    </div>
  );
};

export default Dashboard;
