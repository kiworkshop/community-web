import { Card, CardContent, Theme } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import MutableTextField from 'src/common/presentation/components/atmos/MutableTextField';
import ErrorTypography from 'src/common/presentation/components/atmos/typographies/ErrorTypography';
import MySpeedDial, { SpeedDialActionData } from 'src/common/presentation/components/molecules/MySpeedDial';
import MarkdownEditor from 'src/common/presentation/components/organisms/MarkdownEditor';
import inversifyServices from 'src/inversifyServices';
import NoticeFormDto from 'src/mother/notice/api/dto/NoticeFormDto';

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  semiTransparent: {
    opacity: 0.5
  },
  flex: {
    display: 'flex',
  },
  cardContainer: {
    margin: 10
  },
  card: {
    width: 600
  }
}))

interface Props {
  isEditing: boolean
  pending: boolean
  rejected: boolean
}

const { useTranslation } = inversifyServices.common.i18NService;

const NoticeForm: React.FC<InjectedFormProps<NoticeFormDto, Props> & Props> = ({
  handleSubmit,
  isEditing,
  pending,
  rejected
}) => {
  const classes = useStyles();
  const { t } = useTranslation(["mother", "common"]);
  const actions: SpeedDialActionData[] = [{
    icon: <Check />,
    name: isEditing ? t('common:complete.edit') : t('common:complete.add'),
    handleClick: handleSubmit
  }]

  return <form>
    <ErrorTypography hidden={!rejected}>
      {t("common:rejected.get")}
    </ErrorTypography>

    <div className={clsx({ [classes.semiTransparent]: pending })}>
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent>
            <Field
              name="title"
              component={MutableTextField}
              label={t("notice.title")}
            />
          </CardContent>
        </Card>
      </div>
      <div className={classes.cardContainer}>
        <Field name="content" component={MarkdownEditor} props={{
          label: t("notice.content"),
        }} />
      </div>
    </div>

    <MySpeedDial actions={actions} />
  </form>;
}

export default reduxForm<NoticeFormDto, Props>({
  form: "NoticeForm",
  enableReinitialize: true,
  // validate
})(NoticeForm);