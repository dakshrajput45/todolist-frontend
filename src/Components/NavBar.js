import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const navigate = useNavigate();
  function wishClickHandler() {
    if (props.isLoggedIn === true) navigate("/addtask");
    else {
      toast.error("Please Log In");
    }
  }
  function taskClickHandler() {
    if (props.isLoggedIn === true) navigate("/tasks");
    else {
      toast.error("Please Log In");
    }
  }
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TaskManager
      </Typography>
      <Divider />
      <List>
          <ListItem  disablePadding>
            <ListItemButton onClick={taskClickHandler} sx={{ textAlign: "center" }}>
              <ListItemText primary={"Tasks"} />
            </ListItemButton>
          </ListItem>
          
          <ListItem  disablePadding>
            <ListItemButton onClick={wishClickHandler} sx={{ textAlign: "center" }}>
              <ListItemText primary={"Add task"} />
            </ListItemButton>
          </ListItem>

          
          {!props.isLoggedIn && (<ListItem  disablePadding>
            <ListItemButton onClick={() => {
                navigate("/signup");
              }} sx={{ textAlign: "center" }}>
              <ListItemText primary={"Sign Up"} />
            </ListItemButton>
          </ListItem>)}

          
          {props.isLoggedIn && (<ListItem  onClick={() => {
                navigate("/");
              props.setIsLoggedIn(!props.isLoggedIn);
              toast.success("Logget Out");
              }} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>)}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" className="nav-box" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Task Manager
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              onClick={taskClickHandler}
              sx={{ color: "#fff" }}
            >
              Tasks
            </Button>
            <Button onClick={wishClickHandler} sx={{ color: "#fff" }}>
              Add Task
            </Button>
            {!props.isLoggedIn && (<Button
              onClick={() => {
                navigate("/signup");
              }}
              sx={{ color: "#fff" }}
            >
              Sign Up
            </Button>)}

            
            {props.isLoggedIn && (<Button
              onClick={() => {
                navigate("/");
              props.setIsLoggedIn(!props.isLoggedIn);
              toast.success("Logget Out");
              }}
              sx={{ color: "#fff" }}
            >
              Log Out
            </Button>)}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
