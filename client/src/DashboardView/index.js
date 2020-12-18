import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import LiveReading from "./LiveReading";
import Analytics from "./Analytics";
import LongText from "./LongText";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

const DashboardView = () => {
  const classes = useStyles();

  return (
    <div id="dashboardViewContent">
      {/* <LiveReading /> */}
      <Analytics />
      {/* <LongText /> */}
    </div>
  );
};

export default DashboardView;
