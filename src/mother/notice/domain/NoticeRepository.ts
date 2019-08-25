import CrudRepository from 'src/common/domain/CrudRepository';
import Notice from './Notice'

export default interface NoticeRepository extends CrudRepository<Notice> { }