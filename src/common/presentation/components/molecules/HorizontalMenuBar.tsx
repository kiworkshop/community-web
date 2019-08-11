import { Paper, Tab, Tabs, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import * as React from 'react';
import FIRST_DEPTH_PATHS from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import Link from '../atmos/Link';

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
      backgroundColor: theme.palette.primary.main,
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

interface Props {
  pathname: string
}

const HorizontalMenuBar: React.FC<Props> = ({ pathname }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (pathname === "/") {
      setValue(0);
      return;
    }
    setValue(FIRST_DEPTH_PATHS.findIndex((urlPrefix, index) => index > 0 && pathname.startsWith(urlPrefix)))
  })

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
        {FIRST_DEPTH_PATHS.map((path, index) =>
          <Link key={index} href={path} underline="none" color="inherit">
            <StyledTab className={classes.tab} label={path} />
          </Link>
        )}
      </StyledTabs>
    </Paper>
  );
}

export default HorizontalMenuBar;