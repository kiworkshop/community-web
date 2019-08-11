import * as React from 'react';
import { connect } from 'react-redux';
import { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import CmsLayout from '../../components/templates/CmsLayout';
import { RootState } from '../../state-module/root';

interface Props {
  pathname: string
  firstDepthPath: FirstDepthPath
}

const CmsLayoutContainer: React.FC<Props> = ({ children, firstDepthPath, pathname }) =>
  <CmsLayout pathname={pathname} firstDepthPath={firstDepthPath}>
    {children}
  </CmsLayout>


const mapStateToProps = (state: RootState) => ({
  firstDepthPath: state.horizontalMenuBar.firstDepthPath
})

export default connect(mapStateToProps)(CmsLayoutContainer);