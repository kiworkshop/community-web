import { Card, CardContent, createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import ArticleHtmlPreview from '../atmos/ArticleHtmlPreview';
import MutableTextField from '../atmos/MutableTextField';

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
  return <div className={classes.flex}>
    <div className={classes.previewContainer}>
      <Card style={{ minHeight: 10 }}>
        <ArticleHtmlPreview __html={input.value} style={{
          width: previewWidth
        }} />
      </Card>
    </div>
    <div>
      <Card>
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