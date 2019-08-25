import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles(createStyles({
  wrapper: {
    fontSize: 14,
    letterSpacing: -0.35,
    wordWrap: 'break-word',
    '& img': {
      maxWidth: "100%",
    },
    '& p': {
      padding: '16px 20px',
      margin: 0
    },
    '& div': {
      margin: '0 20px'
    }
  }
}));

interface Props {
  __html: string
}

export default ({ __html }: Props) => {
  const classes = useStyles();
  return <div dangerouslySetInnerHTML={{ __html }} className={classes.wrapper} />
}