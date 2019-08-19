import * as React from 'react';
import NextPage from 'src/common/domain/model/NextPage';

const ContentPage: NextPage = () => <>컨텐츠</>;

ContentPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default ContentPage