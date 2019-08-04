export default interface CrudRepository<T> {
  findById(id: number): Promise<T>
}