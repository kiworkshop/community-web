import { inject, injectable } from "inversify";
import Notice from "../../domain/model/Notice";
import NoticeRepository from "../../domain/repository/NoticeRepository";
import NoticeService from "../../domain/service/NoticeService";
import { notice } from "../../inversify.id"

@injectable()
export default class NoticeServiceImpl implements NoticeService {
  @inject(notice.NoticeRepository) private noticeRepository!: NoticeRepository

  public getNotice = (id: number): Promise<Notice> => {
    return this.noticeRepository.findById(id);
  }
}