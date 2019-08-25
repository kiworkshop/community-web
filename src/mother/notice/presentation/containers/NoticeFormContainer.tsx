import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeFormDto from '../../api/dto/NoticeFormDto';
import NoticeForm from '../components/templates/NoticeForm';
import * as formModule from "../state-module/form";

interface Props {
  id?: number
  isEditing: boolean

  initialNoticeFormDto: NoticeFormDto
  pending: boolean
  rejected: boolean

  dispatchers: typeof formModule
}

const NoticeFormContainer: React.FC<Props> = ({ id, isEditing, initialNoticeFormDto, pending, rejected, dispatchers }) => {
  React.useEffect(() => {
    if (id && isEditing && initialNoticeFormDto.title === "") {
      dispatchers.fetchInitialNotice({ id });
    }
  }, [])

  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  const [post] = React.useState(() => (noticeFormDto: NoticeFormDto) => {
    dispatchers.postNotice({ noticeFormDto });
  })

  const [put] = React.useState(() => (noticeFormDto: NoticeFormDto) => {
    if (!id) {
      return;
    }
    dispatchers.putNotice({ id: id + "", noticeFormDto });
  })

  return <NoticeForm
    onSubmit={isEditing ? put : post}
    initialValues={initialNoticeFormDto}

    isEditing={isEditing}
    pending={pending}
    rejected={rejected} />;
}

const mapStateToProps = ({ mother }: RootState) => ({
  ...mother.notice.form
})

const mapDispatchToProps = (dispatch: Dispatch<formModule.Action>) => ({
  dispatchers: bindActionCreators(formModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeFormContainer);