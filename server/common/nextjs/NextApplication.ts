import { Request } from 'express';
import { ServerResponse } from 'http';
import { injectable } from 'inversify';
import Server from 'next/dist/next-server/server/next-server';
import { ParsedUrlQuery } from 'querystring';

@injectable()
export class NextApplication {
  public handle = this.app.getRequestHandler();

  public constructor(
    private app: Server
  ) { }

  public render = (
    req: Request,
    res: ServerResponse,
    pathname: string,
    query?: ParsedUrlQuery,
    amp?: {
      amphtml?: boolean;
      hasAmp?: boolean;
      dataOnly?: boolean;
    }
  ): Promise<string | null> => this.app.renderToHTML(req, res, pathname, query, amp);
}