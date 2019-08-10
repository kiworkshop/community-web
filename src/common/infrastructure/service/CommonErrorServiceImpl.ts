import { injectable } from "inversify";
import RepositoryError, { RepositoryErrorData } from "src/common/domain/model/RepositoryError";
import CommonErrorService from "src/common/domain/service/CommonErrorService";

@injectable()
export default class CommonErrorServiceImpl implements CommonErrorService {
  public createRepositoryErrorFrom(e?: RepositoryErrorData): RepositoryError {
    return RepositoryError.of(e);
  }
}