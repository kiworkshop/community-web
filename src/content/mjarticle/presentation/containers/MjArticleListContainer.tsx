import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Page from 'src/common/domain/model/Page';
import { RootState } from 'src/common/presentation/state-module/root';
import { MjArticle } from '../../domain/model/MjArticle';
import MjArticleList from '../components/organisms/MjArticleList';
import * as listModule from "../state-module/list"

interface Props {
  page: Page<MjArticle>
  pending: boolean
  rejected: boolean

  dispatchers: typeof listModule
}

const MjArticlePageContainer: React.FC<Props> = ({ page, pending, rejected, dispatchers }) => {
  React.useEffect(() => {
    dispatchers.fetchMjArticlePage()
  }, [])

  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  return <MjArticleList
    page={page}
    pending={pending}
    rejected={rejected} />;
}

const mapStateToProps = ({ content }: RootState) => ({
  page: content.mjArticle.list.page,
  pending: content.mjArticle.list.pending,
  rejected: content.mjArticle.list.rejected
})

const mapDispatchToProps = (dispatch: Dispatch<listModule.Action>) => ({
  dispatchers: bindActionCreators(listModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MjArticlePageContainer);