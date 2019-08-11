import * as React from 'react';
import { connect } from 'react-redux';
import FIRST_DEPTH_PATHS, { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import HorizontalMenuBar from '../../components/molecules/HorizontalMenuBar';
import { RootState } from '../../state-module/root';

interface Props {
  firstDepthPath: FirstDepthPath
}

const HorizontalMenuBarContainer: React.FC<Props> = ({ firstDepthPath }) => {
  return <HorizontalMenuBar value={FIRST_DEPTH_PATHS.indexOf(firstDepthPath)} />;
}

const mapStateToProps = (state: RootState) => ({
  firstDepthPath: state.horizontalMenuBar.firstDepthPath
})

export default connect(mapStateToProps)(HorizontalMenuBarContainer);