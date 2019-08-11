import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import FIRST_DEPTH_PATHS, { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import HorizontalMenuBar from '../../components/molecules/HorizontalMenuBar';
import * as horizontalMenuBarModule from '../../state-module/horizontal-menu-bar'
import { RootState } from '../../state-module/root';

interface Props {
  pathname: string

  firstDepthPath: FirstDepthPath
  dispatchers: typeof horizontalMenuBarModule
}

const getFirstDepthPath = (pathname: string): FirstDepthPath => {
  const to = pathname.indexOf("/", 1);
  if (to < 0) {
    return pathname as FirstDepthPath
  }

  return pathname.substr(0, to) as FirstDepthPath
}

const HorizontalMenuBarContainer: React.FC<Props> = ({ pathname, firstDepthPath, dispatchers }) => {
  React.useEffect(() => {
    dispatchers.setFirstDepthPath({ firstDepthPath: getFirstDepthPath(pathname) })
  })

  return <HorizontalMenuBar value={FIRST_DEPTH_PATHS.indexOf(firstDepthPath)} />;
}

const mapStateToProps = (state: RootState) => ({
  firstDepthPath: state.horizontalMenuBar.firstDepthPath
})

const mapDispatchToProps = (dispatch: Dispatch<horizontalMenuBarModule.Action>) => ({
  dispatchers: bindActionCreators(horizontalMenuBarModule, dispatch as Dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalMenuBarContainer);