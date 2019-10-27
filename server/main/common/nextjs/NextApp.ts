import { injectable } from 'inversify';
import next from 'next';

const APP = next({ dev: process.env.NODE_ENV !== 'production' });

@injectable()
export class NextApp {
  public get() { return APP; }
}