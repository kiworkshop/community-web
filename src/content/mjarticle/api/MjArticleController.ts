import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";
import { Endpoints } from "server/common/utils/Constants";

const PATH = Endpoints["content.mjArticle"];

@controller(PATH)
export class MjArticleController implements interfaces.Controller {

  constructor(@inject(TYPES.NextApplication) private nextApp: NextApplication) { }

  @httpGet("/")
  public index(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(req, res, PATH);
  }
}