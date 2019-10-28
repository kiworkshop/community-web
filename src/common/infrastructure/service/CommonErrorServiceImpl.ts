import RepositoryError, { RepositoryErrorData } from "src/common/domain/RepositoryError";
import CommonErrorService from "src/common/domain/service/CommonErrorService";

class CommonErrorServiceImpl implements CommonErrorService {
  public createRepositoryErrorFrom(e?: RepositoryErrorData): RepositoryError {
    return RepositoryError.of(e);
  }
}

export default new CommonErrorServiceImpl();