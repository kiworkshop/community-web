import { Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import "../../mother/api/MotherController";
import "../../mother/notice/api/NoticeController";
import "../api/CommonController";

export const createInversifyContainer = () => {
  const container = new Container();
  container.bind<NextApplication>(TYPES.NextApplication).to(NextApplication);
  return container;
}