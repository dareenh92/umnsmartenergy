import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sectionHeader: {
    marginBottom: theme.spacing(2),
  },
}));

const LiveReading = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="h5"
        color="primary"
        className={classes.sectionHeader}
      >
        Current status
      </Typography>
      <Grid container spacing={3}>
        <Grid item key="logger3" xs={6}>
          <Paper variant="outlined" className={classes.paper}>
            <Typography variant="h6" color="primary">
              Logger 3
            </Typography>
            <Typography variant="subtitle1">Temp: 25.6 celcius</Typography>
            <Typography variant="subtitle1">Humidity: 51</Typography>
          </Paper>
        </Grid>
        <Grid item key="logger4" xs={6}>
          <Paper variant="outlined" className={classes.paper}>
            <Typography variant="h6" color="primary">
              Logger 4
            </Typography>
            <Typography variant="subtitle1">Temp: 28.2 celcius</Typography>
            <Typography variant="subtitle1">Humidity: 56</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LiveReading;
