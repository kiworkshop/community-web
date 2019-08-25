import { Card, CardContent, Theme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import ArticleHtmlPreview from 'src/common/presentation/components/atmos/ArticleHtmlPreview';
import ImmutableTextField from 'src/common/presentation/components/atmos/ImmutableTextField';
import ErrorTypography from 'src/common/presentation/components/atmos/typographies/ErrorTypography';
import MySpeedDial, { SpeedDialActionData } from 'src/common/presentation/components/molecules/MySpeedDial';
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


const actions: SpeedDialActionData[] = [
  { icon: <FileCopyIcon />, name: 'Copy', handleClick: () => { alert('hi') } },
  { icon: <SaveIcon />, name: 'Save', handleClick: () => { alert('hi') } },
  { icon: <PrintIcon />, name: 'Print', handleClick: () => { alert('hi') } },
  { icon: <ShareIcon />, name: 'Share', handleClick: () => { alert('hi') } },
  { icon: <DeleteIcon />, name: 'Delete', handleClick: () => { alert('hi') } },
];

const { useTranslation } = inversifyServices.common.i18NService;
const NoticeDetail: React.FC<Props> = ({ notice, pending, rejected }) => {
  const classes = useStyles();
  const { t } = useTranslation(["mother", "common"]);

  const { id, title, content } = notice;
  return <>
    <ErrorTypography hidden={!rejected}>
      {t("common:rejected.get")}
    </ErrorTypography>

    <div className={clsx(classes.flex, {
      [classes.semiTransparent]: pending || rejected
    })}>
      <div className={classes.cardContainer}>
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

    <MySpeedDial actions={actions} />
  </>
}

export default NoticeDetail;