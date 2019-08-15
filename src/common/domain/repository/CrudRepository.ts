import Page from "../model/Page";
import PageRequest from "../model/PageRequest";

export default interface CrudRepository<T> {
  findById(id: number): Promise<T>
  findAll(pageRequest: PageRequest): Promise<Page<T>>
}