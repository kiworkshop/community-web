import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';
import MjArticleListContainer from 'src/content/mjarticle/presentation/containers/MjArticleListContainer';

const MjArticlePage: NextPage = () => <MjArticleListContainer />;

MjArticlePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'content', 'noti'],
})

export default MjArticlePage;