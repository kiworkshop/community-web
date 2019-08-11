import AppBar from '@material-ui/core/AppBar';
import { grey } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import HorizontalMenuBar from '../molecules/HorizontalMenuBar';

const drawerWidth = 240;
const horizontalMenuBarHeight = 31; /* manually calculate the height of horizonMenuBar */

const useStyles = makeStyles((theme: Theme) => createStyles({
  flex: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "0 0px 8px 0 rgba(0, 0, 0, 0.1)"
  },
  menuButton: {
    marginRight: 12,
    '&:hover': {
      background: "transparent"
    }
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    border: 0,
    background: grey[50]
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  horizontalMenuBar: {
    height: horizontalMenuBarHeight
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0
  },
  listItemContent: {
    width: "100%"
  },
  listItemIcon: {
    minWidth: 50,
    marginLeft: (theme.spacing(7) + 1) / 2 - 12,
    [theme.breakpoints.up('sm')]: {
      marginLeft: (theme.spacing(9) + 1) / 2 - 12,
    },
  },
  listItemText: {
    fontSize: "0.8em",
    marginTop: 2
  },
  textAlignCenter: {
    textAlign: "center"
  },
  listDrawerClose: {
    paddingTop: 0
  },
  listItemContentDrawerClose: {
    paddingTop: 8
  },
  horizontalMenuBarWrapper: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer - 1,
    width: "100%"
  }
}));

const CmsLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerToggle = () => setOpen(!open);

  return (
    <div className={classes.flex}>
      <CssBaseline />
      <AppBar
        elevation={0}
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{
            fontFamily: "BM HANNA",
            cursor: 'default'
          }}>
            광일공방 CMS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <List className={clsx({
          [classes.listDrawerClose]: !open
        })}>
          {['홈', '인기', '구독', '라이브러리'].map((text, index) => (
            <ListItem button key={text} className={classes.listItem}>
              <div className={clsx(classes.listItemContent, {
                [classes.flex]: open,
                [classes.listItemContentDrawerClose]: !open
              })}>
                <ListItemIcon className={classes.listItemIcon}>
                  {index % 2 === 0 ? <Home color={index === 0 ? "primary" : "inherit"} /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ style: { fontSize: open ? "0.8rem" : "0.9em" } }}
                  className={clsx(classes.listItemText, {
                    [classes.textAlignCenter]: !open
                  })}
                />
              </div>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text} className={classes.listItem}>
              <div className={clsx(classes.listItemContent, {
                [classes.flex]: open
              })}>
                <ListItemIcon className={classes.listItemIcon}>
                  {index % 2 === 0 ? <Home /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ style: { fontSize: open ? "1rem" : "1em" } }}
                  className={clsx(classes.listItemText, {
                    [classes.textAlignCenter]: !open
                  })}
                />
              </div>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div style={{ width: "100%" }}>
        <div className={classes.toolbar} />
        <div className={classes.horizontalMenuBarWrapper}>
          <HorizontalMenuBar />
        </div>
        <main className={classes.content}>
          <div className={classes.horizontalMenuBar} />
          {children}
        </main>
      </div>
    </div>
  );
}

export default CmsLayout;