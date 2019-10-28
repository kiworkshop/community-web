import RepositoryError, { RepositoryErrorData } from "../RepositoryError";

export default interface CommonErrorService {
  createRepositoryErrorFrom(e?: RepositoryErrorData): RepositoryError
}