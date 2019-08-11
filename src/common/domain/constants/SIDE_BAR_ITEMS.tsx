import { Announcement, Edit, Home, Mood } from '@material-ui/icons';
import FIRST_DEPTH_PATHS, { FirstDepthPath } from './FIRST_DEPTH_PATHS';

interface SideBarItem {
  text: string
  icon: JSX.Element
  href: string
}

const dummy: SideBarItem[] = [{
  text: "더미1",
  icon: <Mood />,
  href: ""
}, {
  text: "더미2",
  icon: <Mood />,
  href: ""
}, {
  text: "더미3",
  icon: <Mood />,
  href: ""
}]

const SIDE_BAR_ITEMS = new Map<FirstDepthPath, SideBarItem[][]>();

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[0], [[{
  text: "메인",
  icon: <Home />,
  href: ""
}], dummy])

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[1], [[{
  text: "공지사항",
  icon: <Announcement />,
  href: ""
}], dummy]);

SIDE_BAR_ITEMS.set(FIRST_DEPTH_PATHS[2], [[{
  text: "게시판",
  icon: <Edit />,
  href: ""
}], dummy]);

export default SIDE_BAR_ITEMS;