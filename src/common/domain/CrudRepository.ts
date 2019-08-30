import Long from 'src/common/domain/Long';
import Page from "./Page";
import PageRequest from "./PageRequest";

export default interface CrudRepository<T> {
  findById(id: Long): Promise<T>
  findAll(pageRequest: PageRequest): Promise<Page<T>>
  save(notice: T): Promise<Long>
  deleteById(id: Long): Promise<void>
}