import { Button, createStyles, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import * as React from 'react';

const useStyles = makeStyles(createStyles({
  icon: {
    opacity: 0.8,
    minWidth: 'initial'
  }
}))

const NotificationCenterButton: React.FC = () => {
  const classes = useStyles();

  return <Button className={classes.icon} size="small">
    <Notifications />
  </Button>
}

export default NotificationCenterButton;