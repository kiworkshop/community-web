import { Container } from 'inversify';
import { NextApp } from '../nextjs/NextApp';

export const createContainer = () => {
  const container = new Container();
  container.bind<NextApp>('NextApp').to(NextApp);
  return container;
}