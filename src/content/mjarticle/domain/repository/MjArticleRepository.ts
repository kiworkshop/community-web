import CrudRepository from 'src/common/domain/repository/CrudRepository';
import { MjArticle } from '../model/MjArticle';

export default interface NoticeRepository extends CrudRepository<MjArticle> { }