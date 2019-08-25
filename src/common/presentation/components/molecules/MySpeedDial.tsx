import { makeStyles, Theme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React from 'react';

export interface SpeedDialActionData {
  icon: JSX.Element
  name: string
  handleClick(): void
}

const useStyles = makeStyles((theme: Theme) => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(6),
    right: theme.spacing(3),
  },
}));


interface Props {
  actions: SpeedDialActionData[]
}

const MySpeedDial: React.FC<Props> = ({ actions }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SpeedDial
        ariaLabel="MySpeedDial"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onBlur={handleClose}
        onClick={handleClick}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default MySpeedDial