import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", height: "100%", width: "100%" },
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
  },
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
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            UMN Smart Energy
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Toolbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
