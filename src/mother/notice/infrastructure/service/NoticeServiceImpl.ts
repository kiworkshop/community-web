import Notice from "../../domain/model/Notice";
import NoticeRepository from "../../domain/repository/NoticeRepository";
import NoticeService from "../../domain/service/NoticeService";

export default class NoticeServiceImpl implements NoticeService {
  private noticeRepository: NoticeRepository

  constructor(noticeRepository: NoticeRepository) {
    this.noticeRepository = noticeRepository;
  }

  public getNotice(id: number): Promise<Notice> {
    return this.noticeRepository.findById(id);
  }
}