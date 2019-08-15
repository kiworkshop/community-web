import Axios from 'axios';
import { inject, injectable } from "inversify";
import Page from 'src/common/domain/model/Page';
import PageRequest from 'src/common/domain/model/PageRequest';
import CommonErrorService from 'src/common/domain/service/CommonErrorService';
import { inversifyIds } from "src/inversifyIds"
import Notice from '../../domain/model/Notice';
import NoticeRepository from '../../domain/repository/NoticeRepository'

const NOTICE_REPO_URL = `${process.env.REPOSITORY_URL}/notices`

@injectable()
export default class NoticeRepositoryImpl implements NoticeRepository {
  @inject(inversifyIds.common.CommonErrorService) private commonErrorService!: CommonErrorService

  public findById = (id: number): Promise<Notice> => new Promise((resolve, rejected) => {
    Axios.get<Notice>(`${NOTICE_REPO_URL}/${id}`)
      .then(({ data }) => resolve(data))
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
}