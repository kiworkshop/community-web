import { Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import "src/common/api/CommonController";
import "src/content/api/ContentController";
import "src/mother/api/MotherController";

export const createInversifyContainer = () => {
  const container = new Container();
  container.bind<NextApplication>(TYPES.NextApplication).to(NextApplication);
  return container;
}