import { Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';

import "../../mother/api/MotherController";
import "../../mother/notice/api/NoticeController";
import "../api/CommonController";

export const createContainer = () => {
  const container = new Container();
  container.bind<NextApplication>('NextApp').to(NextApplication);
  return container;
}