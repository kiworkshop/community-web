
import { Paper, Tab, Tabs, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import * as React from 'react';

const TAB_WIDTH = 110;

interface StyledTabsProps {
  value: number;
  className: string;
  onChange(event: React.ChangeEvent<{}>, newValue: number): void;
}

const StyledTabs = withStyles((theme: Theme) => createStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: TAB_WIDTH,
      width: '100%',
      backgroundColor: theme.palette.primary.light,
    },
  },
}))((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

interface StyledTabProps {
  label: string;
  className: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      minWidth: TAB_WIDTH,
      '&:focus': {
        opacity: 1,
      },
    },
  }),
)((props: StyledTabProps) => <Tab {...props} />);


const useStyles = makeStyles({
  tab: {
    minHeight: "initial",
    fontSize: "0.9em"
  },
  paper: {
    boxShadow: "0 0px 8px 0 rgba(0, 0, 0, 0.1)",
    background: grey[50]
  }
});

const HorizontalMenuBar: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  return (
    <Paper square className={classes.paper}>
      <StyledTabs
        className={classes.tab}
        value={value}
        onChange={handleChange}
      >
        <StyledTab className={classes.tab} label="메뉴1" />
        <StyledTab className={classes.tab} label="메뉴2" />
        <StyledTab className={classes.tab} label="메뉴3" />
      </StyledTabs>
    </Paper>
  );
}

export default HorizontalMenuBar;