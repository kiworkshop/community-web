import { Container } from 'inversify';
import { NextApp } from '../nextjs/NextApp';

import "../../common/api/CommonController";
import "../../mother/api/MotherController";
import "../../mother/notice/api/NoticeController";

export const createContainer = () => {
  const container = new Container();
  container.bind<NextApp>('NextApp').to(NextApp);
  return container;
}