import { IncomingMessage, ServerResponse } from 'http';
import { injectable } from 'inversify';
import next from 'next';
import { ParsedUrlQuery } from 'querystring';
import { UrlWithParsedQuery } from 'url';

const APP = next({ dev: process.env.NODE_ENV !== 'production' });
const preparedApp = APP.prepare();

@injectable()
export class NextApplication {
  public render: typeof APP.render = (
    req: IncomingMessage,
    res: ServerResponse,
    pathname: string,
    query?: ParsedUrlQuery,
    parsedUrl?: UrlWithParsedQuery
  ) => APP.render(req, res, pathname, query, parsedUrl)

  public getRequestHandler = () => APP.getRequestHandler();

  public run() {
    return preparedApp;
  }
}