import Axios from 'axios';
import { inject, injectable } from "inversify";
import Id from 'src/common/domain/Id';
import Page from 'src/common/domain/Page';
import PageRequest from 'src/common/domain/PageRequest';
import CommonErrorService from 'src/common/service/CommonErrorService';
import { inversifyIds } from "src/inversifyIds"
import Notice from '../../domain/Notice';
import NoticeRepository from '../../domain/NoticeRepository'

const NOTICE_REPO_URL = `${process.env.REPOSITORY_URL}/notices`

@injectable()
export default class NoticeRepositoryImpl implements NoticeRepository {
  @inject(inversifyIds.common.CommonErrorService) private commonErrorService!: CommonErrorService

  public findById = (id: Id): Promise<Notice> => new Promise((resolve, rejected) => {
    Axios.get<Notice>(`${NOTICE_REPO_URL}/${id}`)
      .then(({ data }) => resolve({
        ...data,
        id
      }))
      .catch(e => rejected(this.commonErrorService.createRepositoryErrorFrom(e)));
  })

  public findAll = ({ page, size, sort = "id,desc" }: PageRequest): Promise<Page<Notice>> =>
    new Promise((resolve, rejected) => {
      Axios.get<Page<Notice>>(NOTICE_REPO_URL, {
        params: {
          page, size, sort
        }
      })
        .then(({ data }) => resolve(data))
        .catch(e => rejected(this.commonErrorService.createRepositoryErrorFrom(e)));
    })

  public save = (notice: Notice): Promise<Id> => {
    if (notice.id > 0) {
      return new Promise((resolve, rejected) => {
        Axios.put<void>(`${NOTICE_REPO_URL}/${notice.id}`, notice)
          .then(() => resolve(notice.id))
          .catch(e => rejected(this.commonErrorService.createRepositoryErrorFrom(e)));
      })
    }

    return new Promise((resolve, rejected) => {
      Axios.post<Id>(NOTICE_REPO_URL, notice)
        .then(({ data: id }) => resolve(id))
        .catch(e => rejected(this.commonErrorService.createRepositoryErrorFrom(e)));
    })
  }

  public deleteById = (id: Id): Promise<void> => new Promise((resolve, rejected) => {
    Axios.delete<void>(`${NOTICE_REPO_URL}/${id}`)
      .then(() => resolve())
      .catch(e => rejected(this.commonErrorService.createRepositoryErrorFrom(e)));
  })
}