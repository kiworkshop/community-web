import { injectable } from "inversify";
import RepositoryError, { RepositoryErrorData } from "src/common/domain/RepositoryError";
import CommonErrorService from "src/common/service/CommonErrorService";

@injectable()
export default class CommonErrorServiceImpl implements CommonErrorService {
  public createRepositoryErrorFrom(e?: RepositoryErrorData): RepositoryError {
    return RepositoryError.of(e);
  }
}