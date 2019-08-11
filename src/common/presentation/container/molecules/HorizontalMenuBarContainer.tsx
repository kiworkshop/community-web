import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import HorizontalMenuBar from '../../components/molecules/HorizontalMenuBar';
import * as horizontalMenuBarModule from '../../state-module/horizontal-menu-bar'

interface Props {
  pathname: FirstDepthPath
  dispatchers: typeof horizontalMenuBarModule
}

const HorizontalMenuBarContainer: React.FC<Props> = ({ pathname, dispatchers }) => {
  React.useEffect(() => {
    dispatchers.setFirstDepthPath({ firstDepthPath: pathname })
  })

  return <HorizontalMenuBar pathname={pathname} />;
}

const mapDispatchToProps = (dispatch: Dispatch<horizontalMenuBarModule.Action>) => ({
  dispatchers: bindActionCreators(horizontalMenuBarModule, dispatch as Dispatch)
})

export default connect(null, mapDispatchToProps)(HorizontalMenuBarContainer);