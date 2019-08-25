import { Card, CardContent, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import ArticleHtmlPreview from 'src/common/presentation/components/atmos/ArticleHtmlPreview';
import ImmutableTextField from 'src/common/presentation/components/atmos/ImmutableTextField';
import inversifyServices from 'src/inversifyServices';
import Notice from 'src/mother/notice/domain/Notice';

interface Props {
  notice: Notice
  pending: boolean
  rejected: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  semiTransparent: {
    opacity: 0.5
  },
  flex: {
    display: 'flex'
  },
  cardContainer: {
    margin: 10
  },
  card: {
    width: 400
  }
}))

const { useTranslation } = inversifyServices.common.i18NService;
const NoticeDetail: React.FC<Props> = ({ notice, pending, rejected }) => {
  const classes = useStyles();
  const { t } = useTranslation("mother");

  const { id, title, content } = notice;
  return <div className={clsx(classes.flex, {
    [classes.semiTransparent]: pending
  })}>
    <div className={classes.cardContainer}>
      <p hidden={!rejected}>데이터를 가져올 수 없습니다.</p>
      <Card className={classes.card}>
        <ArticleHtmlPreview __html={content} />
      </Card>
    </div>
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardContent>
          <ImmutableTextField label="ID" value={id} fullWidth />
          <div className={classes.spacing} />
          <ImmutableTextField label={t("notice.title")} value={title} fullWidth />
        </CardContent>
      </Card>
    </div>
  </div>
}

export default NoticeDetail;