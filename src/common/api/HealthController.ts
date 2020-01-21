import { controller, httpGet, interfaces } from "inversify-express-utils";

const PATH = "/health";

@controller(PATH)
export class HealthController implements interfaces.Controller {

  @httpGet("/")
  public health() {
    return "ok\n";
  }
}