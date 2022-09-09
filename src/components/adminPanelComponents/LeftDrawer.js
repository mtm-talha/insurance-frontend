import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material//Button";
import {
  SET_MODULE_MEDICARE_ADMIN,
  SET_MODULE_DASHBOARD_ADMIN,
  SET_MODULE_AUTO_ADMIN,
  SET_MODULE_LIFE_ADMIN,
  SET_MODULE_DATA_ENTRY_ADMIN,
} from "../../context/appContext/appActions";
import DashboardModule from "./DashboardModule";
import AutoModule from "./AutoModule";
import LifeModule from "./LifeModule";
import MedicareModule from "./MedicareModule";
import { useAppContext } from "../../context/appContext/AppContext";
import { useNavigate } from "react-router-dom";
import DataEntryForm from "./DataEntryForm";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function LeftDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [dashboardActive, setDashboardActive] = useState(true);
  const [autoActive, setAutoActive] = useState(false);
  const [lifeActive, setLifeActive] = useState(false);
  const [medicareActive, setMedicareActive] = useState(false);
  const [dataEntryActive, setDataEntryActive] = useState(false);
  const { adminLogout, resetPassword, adminObj } = useAppContext();
  const [access, setAccess] = useState("");
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  async function handleSignout() {
    adminLogout().then((res) => {
      if (res === true) {
        //("reponse is", res)
        window.sessionStorage.removeItem("authAccess");
        window.sessionStorage.removeItem("accessType");

        navigate("/");
        //("Sign out success");
      } else {
        //("Sign out failed");
      }
    });
  }
  async function handleResetPassword() {
    resetPassword().then((res) => {
      if (res === true) {
        //("Mail sent");
        window.alert("Mail sent");
      } else {
        //("Mail Not sent");
        window.alert("Some error occured,please try again!");
      }
    });
  }
  const handleDrawerModule = (moduleToSet) => {
    //("Module to set in handleDrawerModule: ", moduleToSet)
    switch (moduleToSet) {
      default:
        setDashboardActive(true);
        setLifeActive(false);
        setAutoActive(false);
        setMedicareActive(false);
        setDataEntryActive(false);

        break;
      case SET_MODULE_DASHBOARD_ADMIN:
        setDashboardActive(true);
        setLifeActive(false);
        setAutoActive(false);
        setMedicareActive(false);
        setDataEntryActive(false);
        break;
      case SET_MODULE_LIFE_ADMIN:
        setDashboardActive(false);
        setLifeActive(true);
        setAutoActive(false);
        setMedicareActive(false);
        setDataEntryActive(false);
        break;
      case SET_MODULE_AUTO_ADMIN:
        setDashboardActive(false);
        setLifeActive(false);
        setAutoActive(true);
        setMedicareActive(false);
        setDataEntryActive(false);
        break;

      case SET_MODULE_MEDICARE_ADMIN:
        setDashboardActive(false);
        setLifeActive(false);
        setAutoActive(false);
        setMedicareActive(true);
        setDataEntryActive(false);
        break;

      case SET_MODULE_DATA_ENTRY_ADMIN:
        setDashboardActive(false);
        setLifeActive(false);
        setAutoActive(false);
        setMedicareActive(false);
        setDataEntryActive(true);
        break;
    }
  };
  useEffect(() => {
    //("The access rights are", adminObj);
    //(window.sessionStorage.getItem("accessType"));
    setAccess(window.sessionStorage.getItem("accessType"));
  }, [access]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Advance Insurance Online Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {[
            "Auto Insurance Clients",
            "Medicare Insurance Clients",
            "Life Insurance Clients",
          ].map((text, index) => (
            <ListItem button key={text} onClick={}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem
            // disabled={adminObj.accessType === "agent" ? true : false}
            disabled={access === "agent" ? true : false}
            button
            key="Dashboard"
            value={SET_MODULE_DASHBOARD_ADMIN}
            onClick={() => handleDrawerModule(SET_MODULE_DASHBOARD_ADMIN)}
          >
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
            // disabled={adminObj.accessType === "agent" ? true : false}
            disabled={access === "agent" ? true : false}
            button
            key="Auto"
            value={SET_MODULE_AUTO_ADMIN}
            onClick={() => handleDrawerModule(SET_MODULE_AUTO_ADMIN)}
          >
            <ListItemText primary={"Auto Insurance Clients"} />
          </ListItem>
          <ListItem
            // disabled={adminObj.accessType === "agent" ? true : false}
            disabled={access === "agent" ? true : false}
            button
            key="Medicare"
            value={SET_MODULE_MEDICARE_ADMIN}
            onClick={() => handleDrawerModule(SET_MODULE_MEDICARE_ADMIN)}
          >
            <ListItemText primary={"Medicare Insurance Clients"} />
          </ListItem>

          <ListItem
            // disabled={adminObj.accessType === "agent" ? true : false}
            disabled={access === "agent" ? true : false}
            button
            key="Life"
            value={SET_MODULE_LIFE_ADMIN}
            onClick={() => handleDrawerModule(SET_MODULE_LIFE_ADMIN)}
          >
            <ListItemText primary={"Life Insurance Clients"} />
          </ListItem>
          <ListItem
            hidden={access === "admin" ? true : false}
            button
            key="Life"
            value={SET_MODULE_DATA_ENTRY_ADMIN}
            onClick={() => handleDrawerModule(SET_MODULE_DATA_ENTRY_ADMIN)}
          >
            <ListItemText primary={"Data Entry"} />
          </ListItem>
          <ListItem button onClick={handleSignout}>
            <ListItemText primary={"Logout"} />
            <LogoutIcon />
          </ListItem>
          <ListItem button onClick={handleResetPassword}>
            <ListItemText primary={"Reset Password"} />
          </ListItem>
        </List>
        <Divider />
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {dashboardActive ? <DashboardModule /> : null}
        {autoActive ? <AutoModule /> : null}
        {lifeActive ? <LifeModule /> : null}
        {medicareActive ? <MedicareModule /> : null}
        {dataEntryActive ? <DataEntryForm /> : null}
      </Main>
    </Box>
  );
}
