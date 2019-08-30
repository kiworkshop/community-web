import { decorate, inject, injectable } from "inversify";
import Long from 'src/common/domain/Long';
import Page from "src/common/domain/Page";
import PageRequest from "src/common/domain/PageRequest";
import NoticeRequestDto from "../../api/dto/NoticeRequestDto";
import Notice from "../../domain/Notice";
import NoticeRepository from "../../domain/NoticeRepository";
import { notice } from "../../inversify.id";
import NoticeService from "../../service/NoticeService";

@injectable()
export default class NoticeServiceImpl implements NoticeService {
  constructor(private noticeRepository: NoticeRepository) { }

  public getNotice = (id: Long): Promise<Notice> => this.noticeRepository.findById(id)

  public getNoticePage = (pageRequest: PageRequest): Promise<Page<Notice>> =>
    this.noticeRepository.findAll(pageRequest);

  public postNotice = ({ title, content }: NoticeRequestDto): Promise<Long> =>
    this.noticeRepository.save({ id: new Long(-1), title, content });

  public putNotice = (id: Long, { title, content }: NoticeRequestDto): Promise<void> =>
    this.noticeRepository.save({ id, title, content }).then(() => { return });

  public deleteNotice = (id: Long): Promise<void> =>
    this.noticeRepository.deleteById(id).then(() => { return });
}

decorate(inject(notice.NoticeRepository) as ParameterDecorator, NoticeServiceImpl, 0);