import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, requestParam, response } from "inversify-express-utils";
import { NextApp } from "server/main/common/nextjs/NextApp";

const PATH = "/mother/notice";

@controller(PATH)
export class ImageController implements interfaces.Controller {

  constructor(@inject("NextApp") private nextApp: NextApp) { }

  @httpGet("/add")
  public add(
    @request() req: Request,
    @response() res: Response,
  ) {
    return this.nextApp.get().render(req, res, `${PATH}/add`);
  }

  @httpGet("/edit/:id")
  public edit(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") id: string,
  ) {
    return this.nextApp.get().render(req, res, `${PATH}/form`, { id });
  }

  @httpGet("/:id")
  public detail(
    @request() req: Request,
    @response() res: Response,
    @requestParam("id") id: string,
  ) {
    return this.nextApp.get().render(req, res, `${PATH}/detail`, { id });
  }

  @httpGet("/")
  public index(
    @request() req: Request,
    @response() res: Response,
  ) {
    return this.nextApp.get().render(req, res, PATH);
  }
}