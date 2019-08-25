import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeFormDto from '../../api/dto/NoticeFormDto';
import NoticeForm from '../components/organisms/NoticeForm';
import * as formModule from "../state-module/form";

interface Props {
  id?: number

  initialNoticeFormDto: NoticeFormDto
  pending: boolean
  rejected: boolean

  dispatchers: typeof formModule
}

const NoticeFormContainer: React.FC<Props> = ({ id, initialNoticeFormDto, pending, rejected, dispatchers }) => {
  React.useEffect(() => {
    if (id && initialNoticeFormDto.title === "") {
      dispatchers.fetchInitialNotice({ id });
    }
  }, [])

  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  return <NoticeForm
    initialNoticeFormDto={initialNoticeFormDto}
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