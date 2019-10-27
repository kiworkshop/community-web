import { injectable } from 'inversify';
import next from 'next';

const APP = next({ dev: process.env.NODE_ENV !== 'production' });
const preparedApp = APP.prepare();

@injectable()
export class NextApplication {
  public handle = APP.getRequestHandler();

  public render: typeof APP.render = (...args) => APP.render(...args)
  public run = () => preparedApp;
}