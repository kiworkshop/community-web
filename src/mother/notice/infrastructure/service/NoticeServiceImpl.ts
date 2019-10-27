import Id from 'src/common/domain/Id';
import Page from "src/common/domain/Page";
import PageRequest from "src/common/domain/PageRequest";
import NoticeRequestDto from "../../api/dto/NoticeRequestDto";
import Notice from "../../domain/Notice";
import NoticeRepository from "../../domain/NoticeRepository";
import NoticeService from "../../service/NoticeService";
import NoticeRepositoryImpl from '../repository/NoticeRepositoryImpl';

class NoticeServiceImpl implements NoticeService {
  constructor(private noticeRepository: NoticeRepository) { }

  public getNotice = (id: Id): Promise<Notice> => this.noticeRepository.findById(id)

  public getNoticePage = (pageRequest: PageRequest): Promise<Page<Notice>> =>
    this.noticeRepository.findAll(pageRequest);

  public postNotice = ({ title, content }: NoticeRequestDto): Promise<Id> =>
    this.noticeRepository.save({ id: -1, title, content });

  public putNotice = (id: Id, { title, content }: NoticeRequestDto): Promise<void> =>
    this.noticeRepository.save({ id, title, content }).then(() => { return });

  public deleteNotice = (id: Id): Promise<void> =>
    this.noticeRepository.deleteById(id).then(() => { return });
}

export default new NoticeServiceImpl(NoticeRepositoryImpl);