import * as React from 'react';
import { connect } from 'react-redux';
import { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import CmsLayout from '../../components/templates/CmsLayout';
import { RootState } from '../../state-module/root';

interface Props {
  firstDepthPath: FirstDepthPath
}

const CmsLayoutContainer: React.FC<Props> = ({ children, firstDepthPath }) => {
  const [open, setOpen] = React.useState(true);
  const toggleOpen = () => setOpen(!open);

  return <CmsLayout firstDepthPath={firstDepthPath} open={open} toggleOpen={toggleOpen}>
    {children}
  </CmsLayout>
}


const mapStateToProps = (state: RootState) => ({
  firstDepthPath: state.common.firstDepthPath
})

export default connect(mapStateToProps)(CmsLayoutContainer);