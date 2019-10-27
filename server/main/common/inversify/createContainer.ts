import { Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';

import "../../common/api/CommonController";
import "../../mother/api/MotherController";
import "../../mother/notice/api/NoticeController";

export const createContainer = () => {
  const container = new Container();
  container.bind<NextApplication>('NextApp').to(NextApplication);
  return container;
}