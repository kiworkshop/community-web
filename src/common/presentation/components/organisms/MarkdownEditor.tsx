import { Card, CardContent, createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import MutableTextField from '../atmos/MutableTextField';
import MarkdownPreview from '../atmos/previews/MarkdownPreview';

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  flex: {
    display: 'flex'
  },
  textInput: {
    background: theme.palette.primary.contrastText
  },
  previewContainer: {
    marginRight: 20
  }
}))

const MarkdownEditor: React.FC<WrappedFieldProps> = (props) => {
  const classes = useStyles();
  const { input } = props;
  const [previewWidth] = React.useState(320);
  const [textFieldWidth] = React.useState(320);
  return <div className={classes.flex}>
    <div className={classes.previewContainer}>
      <Card style={{ minHeight: 10 }}>
        <CardContent>
          <MarkdownPreview markdown={input.value} style={{
            width: previewWidth
          }} />
        </CardContent>
      </Card>
    </div>
    <div>
      <Card style={{ width: textFieldWidth }}>
        <CardContent>
          <MutableTextField
            {...props}
            multiline
          />
        </CardContent>
      </Card>
    </div>
  </div>;
}

export default MarkdownEditor;