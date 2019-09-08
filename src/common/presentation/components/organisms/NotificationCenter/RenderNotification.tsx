import { Card, createStyles, makeStyles, Theme } from '@material-ui/core';
import { blue, green, grey, orange, red } from '@material-ui/core/colors';
import { Cancel } from '@material-ui/icons';
import { VariantType } from 'notistack';
import Optional from 'optional-js';
import * as React from 'react';
import { Snackbar } from 'src/common/presentation/state-module/snackbar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    margin: theme.spacing(1.5),
    background: 'rgba(0, 0, 0, 0.35)',
    color: theme.palette.primary.contrastText,
    border: '0.5px solid #333',
    cursor: 'default'
  },
  titleWrapper: {
    background: 'rgba(0, 0, 0, 0.20)',
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    "& span:first-child": {
      marginLeft: 7,
      opacity: 0.9
    },
    "& span:not(:first-child)": {
      color: grey[400],
      margin: 3,
      lineHeight: 2
    }
  },
  notiContent: {
    margin: `${theme.spacing(1.3)}px ${theme.spacing(2)}px`
  },
  message: {
    marginBottom: theme.spacing(1)
  },
  messageOptions: {
    color: grey[400],
    whiteSpace: "pre"
  },
  cancel: {
    color: grey[400],
    fontSize: '1rem',
    margin: '5px 8px 0px 5px',
    '&:active': {
      color: "#fff"
    }
  }
}))

interface Props {
  snackbar: Snackbar
  handleRemove(): any
}

const colorMap = new Map<VariantType, string>();
const colorWeight = 700;
colorMap.set("default", "initial");
colorMap.set("error", red[colorWeight]);
colorMap.set("info", blue[colorWeight]);
colorMap.set("success", green[colorWeight]);
colorMap.set("warning", orange[colorWeight]);

const RenderNotification: React.FC<Props> = ({ snackbar, handleRemove }) => {
  const classes = useStyles();

  const options = Optional.ofNullable(snackbar.options);

  const variant = options.map(o => o.variant).orElse("default");
  const title = options.map(o => o.title).map(t => `: ${t}`).orElse("");

  const [isCancelButtonHidden, setIsCancelButtonHidden] = React.useState(true);
  const showCancelButton = () => setIsCancelButtonHidden(false);
  const hideCancelButton = () => setIsCancelButtonHidden(true);

  return <>
    <Card className={classes.card} onMouseOver={showCancelButton} onMouseOut={hideCancelButton}>
      <div className={classes.titleWrapper}>
        <div className={classes.title}>
          <span style={{ color: colorMap.get(variant) }}> ● </span>
          <span>{variant}{title}</span>
        </div>
        <div hidden={isCancelButtonHidden} onMouseUp={handleRemove} >
          <Cancel className={classes.cancel} />
        </div>
      </div>
      <div className={classes.notiContent}>
        <div className={classes.message}>
          {snackbar.message}
        </div>
        <div className={classes.messageOptions}>
          {Optional.ofNullable(snackbar.messageOptions).map((mo: any) => mo.e).orElse("")}
        </div>
      </div>
    </Card>
  </>;
}

export default RenderNotification;