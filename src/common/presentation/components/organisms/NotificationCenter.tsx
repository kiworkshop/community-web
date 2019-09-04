import { createStyles, Drawer, makeStyles, useTheme } from '@material-ui/core';
import * as React from 'react';
import { Snackbar } from '../../state-module/snackbar';

const useStyles = makeStyles(createStyles({
  drawerItems: {
    width: 300
  },
}))

interface Props {
  snackbars: Snackbar[]
  opened: boolean
  handleClose(): any
}

const NotificationCenter: React.SFC<Props> = ({ snackbars, opened, handleClose }) => {
  const theme = useTheme();
  const classes = useStyles();

  return <Drawer
    anchor="right"
    open={opened}
    onClose={handleClose}
    PaperProps={{
      style: {
        background: 'rgba(30, 30, 30, 0.75)',
        color: theme.palette.primary.contrastText
      }
    }}
  >
    <div className={classes.drawerItems}>
      {JSON.stringify(snackbars)}
    </div>
  </Drawer >
}


export default NotificationCenter;