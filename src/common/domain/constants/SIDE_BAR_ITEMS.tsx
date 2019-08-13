import { PropTypes } from '@material-ui/core';
import { AccountBalance, Announcement, Backspace, Edit, Home, RecordVoiceOver } from '@material-ui/icons';
import FIRST_DEPTH_PATHS, { FirstDepthPath } from './FIRST_DEPTH_PATHS';

interface SideBarItem {
  text: string
  href: string
  icon({ color }: { color?: PropTypes.Color | 'action' | 'disabled' | 'error' }): JSX.Element
}

const dummy: SideBarItem[] = [{
  text: "더미1",
  href: "",
  icon: ({ color }) => <AccountBalance color={color} />,
}, {
  text: "더미2",
  href: "",
  icon: ({ color }) => <Backspace color={color} />,
}, {
  text: "더미3",
  href: "",
  icon: ({ color }) => <RecordVoiceOver color={color} />,
}]

const SIDE_BAR_ITEMS = new Map<FirstDepthPath, SideBarItem[][]>();

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[0], [[{
  text: "홈",
  href: FIRST_DEPTH_PATHS[0],
  icon: ({ color }) => <Home color={color} />,
}], dummy])

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[1], [[{
  text: "공지사항",
  href: `${FIRST_DEPTH_PATHS[1]}/notice`,
  icon: ({ color }) => <Announcement color={color} />,
}], dummy]);

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[2], [[{
  text: "게시판",
  href: `${FIRST_DEPTH_PATHS[2]}/board`,
  icon: ({ color }) => <Edit color={color} />,
}], dummy]);

SIDE_BAR_ITEMS.set("/_error" as any, SIDE_BAR_ITEMS.get(FIRST_DEPTH_PATHS[0])!)
export default SIDE_BAR_ITEMS;