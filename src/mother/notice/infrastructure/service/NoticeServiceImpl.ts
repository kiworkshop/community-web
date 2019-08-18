import { decorate, inject, injectable } from "inversify";
import Page from "src/common/domain/model/Page";
import PageRequest from "src/common/domain/model/PageRequest";
import Notice from "../../domain/model/Notice";
import NoticeRepository from "../../domain/repository/NoticeRepository";
import NoticeService from "../../domain/service/NoticeService";
import { notice } from "../../inversify.id"

@injectable()
export default class NoticeServiceImpl implements NoticeService {
  constructor(private noticeRepository: NoticeRepository) { }

  public getNotice = (id: number): Promise<Notice> => this.noticeRepository.findById(id)

  public getNoticePage = (pageRequest: PageRequest): Promise<Page<Notice>> =>
    this.noticeRepository.findAll(pageRequest);
}

decorate(inject(notice.NoticeRepository) as ParameterDecorator, NoticeServiceImpl, 0);