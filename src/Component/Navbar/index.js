import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { cloneDeep } from "lodash";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SideNav = (props) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const sideNavIntialData = [
    {
      text: "User Admin",
      hasSubmenu: true,
      openSubmenu: false,
      id: "1",
      subMenu: [
        {
          text: "Add User",
          hasSubmenu: false,
          openSubmenu: false,
          id: "21",
          path: "/add-user",
        },
        {
          text: "User Details",
          hasSubmenu: false,
          openSubmenu: false,
          id: "22",
          path: "/",
        },
      ],
    },
    {
      text: "Task",
      hasSubmenu: true,
      openSubmenu: false,
      id: "2",
      subMenu: [
        {
          text: "User Tasks",
          hasSubmenu: false,
          openSubmenu: false,
          id: "21",
          path: "/task-list",
        },
        {
          text: "Create Task",
          hasSubmenu: false,
          openSubmenu: false,
          id: "22",
          path: "/create-task",
        },
      ],
    },
  ];
  const [sideNavData, setSideNavData] = useState(sideNavIntialData);
  const theme = useTheme();
  const classes = useStyles();

  const handleDrawer = (data) => {
    if (data === "open") {
      setOpen(true);
    } else if (data === "close") {
      setOpen(false);
    }
  };

  const style = {
    flexGrow: 1,
  };

  const onLinkClick = (data) => {
    if (data.hasSubmenu) {
      let tempArray = cloneDeep(sideNavData);
      tempArray.map((item) => {
        if (item.id === data.id) {
          item.openSubmenu = item.openSubmenu ? false : true;
        } else {
          item.openSubmenu = false;
        }
        return item;
      });
      setSideNavData(tempArray);
    } else {
      history.push(data.path);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawer("open")}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" style={style}>
            Task Application
          </Typography>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <Typography variant="h6" style={style}>
                Task Application
              </Typography>
              <IconButton onClick={() => handleDrawer("close")}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {sideNavData.map((item, index) => (
                <div key={index}>
                  <ListItem
                    button
                    key={item.id}
                    onClick={() => onLinkClick(item)}
                  >
                    <ListItemText primary={item.text} />
                    {item.hasSubmenu && item.openSubmenu ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse in={item.openSubmenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.openSubmenu &&
                        item.subMenu.map((item2) => (
                          <ListItem
                            button
                            key={item2.id}
                            className={classes.nested}
                            onClick={() => onLinkClick(item2)}
                          >
                            <ListItemText primary={item2.text} />
                          </ListItem>
                        ))}
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
            <Divider />
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SideNav;
