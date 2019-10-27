import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { NextApp } from "server/main/common/nextjs/NextApp";

const PATH = "/mother"

@controller(PATH)
export class MotherController implements interfaces.Controller {

  constructor(@inject("NextApp") private nextApp: NextApp) { }

  @httpGet("/")
  public get(
    @request() req: Request,
    @response() res: Response,
  ) {
    this.nextApp.get().render(req, res, PATH)
  }
}