import { Id } from "./Id";
import Page from "./Page";
import PageRequest from "./PageRequest";

export default interface CrudRepository<T> {
  findById(id: number): Promise<T>
  findAll(pageRequest: PageRequest): Promise<Page<T>>
  save(notice: T): Promise<Id>
  deleteById(id: number): Promise<void>
}