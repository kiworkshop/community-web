import { AsyncContainerModule, Container, interfaces } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import next from 'next';
import "src/common/api/CommonController";
import "src/common/api/HealthController";
import "src/content/api/ContentController";
import "src/mother/api/MotherController";

export const createInversifyContainer = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  return container;
}

const bindings = new AsyncContainerModule(async (bind) => {
  await bindNextApplication(bind);
})

const bindNextApplication = async (bind: interfaces.Bind) => {
  const app = next({ dev: process.env.NODE_ENV !== 'production' });
  await app.prepare();
  const nextApplication = new NextApplication(
    app
  );

  bind<NextApplication>(TYPES.NextApplication)
    .toConstantValue(nextApplication);
}