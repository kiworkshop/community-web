import { PropTypes } from '@material-ui/core';
import { AccountBalance, Announcement, Backspace, Edit, RecordVoiceOver } from '@material-ui/icons';
import FIRST_DEPTH_PATHS, { FirstDepthPath } from './FIRST_DEPTH_PATHS';

interface SideBarItem {
  text: string
  href: string
  icon({ color }: { color?: PropTypes.Color | 'action' | 'disabled' | 'error' }): JSX.Element
}

const dummy: SideBarItem[] = [{
  text: "dummy1",
  href: "",
  icon: ({ color }) => <AccountBalance color={color} />,
}, {
  text: "dummy2",
  href: "",
  icon: ({ color }) => <Backspace color={color} />,
}, {
  text: "dummy3",
  href: "",
  icon: ({ color }) => <RecordVoiceOver color={color} />,
}]

const SIDE_BAR_ITEMS = new Map<FirstDepthPath, SideBarItem[][]>();

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[0], [[{
  text: 'notice',
  href: `${FIRST_DEPTH_PATHS[0]}/notice`,
  icon: ({ color }) => <Announcement color={color} />,
}], dummy]);

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[1], [[{
  text: 'board',
  href: `${FIRST_DEPTH_PATHS[1]}/board`,
  icon: ({ color }) => <Edit color={color} />,
}], dummy]);

SIDE_BAR_ITEMS.set("/_error" as any, SIDE_BAR_ITEMS.get(FIRST_DEPTH_PATHS[0])!)
export default SIDE_BAR_ITEMS;