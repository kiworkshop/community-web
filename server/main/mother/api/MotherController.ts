import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { NextApplication } from "server/main/common/nextjs/NextApplication";

const PATH = "/mother"

@controller(PATH)
export class MotherController implements interfaces.Controller {

  constructor(@inject("NextApp") private nextApp: NextApplication) { }

  @httpGet("/")
  public get(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(req, res, PATH)
  }
}