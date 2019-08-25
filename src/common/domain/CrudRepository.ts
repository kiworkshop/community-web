import Page from "./Page";
import PageRequest from "./PageRequest";

export default interface CrudRepository<T> {
  findById(id: number): Promise<T>
  findAll(pageRequest: PageRequest): Promise<Page<T>>
}