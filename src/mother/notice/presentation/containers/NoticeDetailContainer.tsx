import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'src/common/presentation/state-module/root';
import Notice from '../../domain/Notice';
import NoticeDetail from '../components/organisms/NoticeDetail';
import * as detailModule from "../state-module/detail"

interface Props {
  id: number

  notice: Notice
  pending: boolean
  rejected: boolean

  dispatchers: typeof detailModule
}

const NoticeDetailContainer: React.FC<Props> = ({ id, notice, pending, rejected, dispatchers }) => {
  React.useEffect(() => {
    if (notice.id < 1) {
      dispatchers.fetchNotice({ id });
    }
  }, [])

  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  return <NoticeDetail
    notice={notice}
    pending={pending}
    rejected={rejected} />;
}

const mapStateToProps = ({ mother }: RootState) => ({
  notice: mother.notice.detail.notice,
  pending: mother.notice.detail.pending,
  rejected: mother.notice.detail.rejected
})

const mapDispatchToProps = (dispatch: Dispatch<detailModule.Action>) => ({
  dispatchers: bindActionCreators(detailModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetailContainer);