import Axios from 'axios';
import { injectable } from "inversify";
import RepositoryError from 'src/common/infrastructure/repository/RepositoryError';
import Notice from '../../domain/model/Notice';
import NoticeRepository from '../../domain/repository/NoticeRepository'

interface NoticeDto {
  id: number
  title: string
  content: string
}

@injectable()
export default class NoticeRepositoryImpl implements NoticeRepository {
  public findById(id: number): Promise<Notice> {
    return new Promise((resolve, rejected) => {
      Axios.get<NoticeDto>(`http://localhost:8080/notices/${id}`)
        .then(({ data }) => resolve(Notice.builder()
          .id(data.id)
          .title(data.title)
          .content(data.content).build()))
        .catch(e => rejected(RepositoryError.of(e)));
    })
  }
}