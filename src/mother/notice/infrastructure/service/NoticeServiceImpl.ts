import { decorate, inject, injectable } from "inversify";
import Page from "src/common/domain/Page";
import PageRequest from "src/common/domain/PageRequest";
import Notice from "../../domain/Notice";
import NoticeRepository from "../../domain/NoticeRepository";
import { notice } from "../../inversify.id";
import NoticeService from "../../service/NoticeService";

@injectable()
export default class NoticeServiceImpl implements NoticeService {
  constructor(private noticeRepository: NoticeRepository) { }

  public getNotice = (id: number): Promise<Notice> => this.noticeRepository.findById(id)

  public getNoticePage = (pageRequest: PageRequest): Promise<Page<Notice>> =>
    this.noticeRepository.findAll(pageRequest);
}

decorate(inject(notice.NoticeRepository) as ParameterDecorator, NoticeServiceImpl, 0);