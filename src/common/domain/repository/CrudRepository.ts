import Id from 'src/common/domain/Id';
import Page from "../Page";
import PageRequest from "../PageRequest";

export default interface CrudRepository<T> {
  findById(id: Id): Promise<T>
  findAll(pageRequest: PageRequest): Promise<Page<T>>
  save(notice: T): Promise<Id>
  deleteById(id: Id): Promise<void>
}