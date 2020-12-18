import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import DashboardView from "./DashboardView";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", height: "100%", width: "100%" },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6">UMN Smart Energy</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Toolbar />
        <DashboardView />
      </div>
    </div>
  );
}

export default App;
