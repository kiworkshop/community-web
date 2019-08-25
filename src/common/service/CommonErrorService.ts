import RepositoryError, { RepositoryErrorData } from "../domain/RepositoryError";

export default interface CommonErrorService {
  createRepositoryErrorFrom(e?: RepositoryErrorData): RepositoryError
}