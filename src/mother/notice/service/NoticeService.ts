import Long from 'src/common/domain/Long';
import Page from "src/common/domain/Page";
import PageRequest from "src/common/domain/PageRequest";
import NoticeRequestDto from "../api/dto/NoticeRequestDto";
import Notice from "../domain/Notice";

export default interface NoticeService {
  getNotice(id: Long): Promise<Notice>
  getNoticePage(pageRequest: PageRequest): Promise<Page<Notice>>
  postNotice(noticeRequestDto: NoticeRequestDto): Promise<Long>
  putNotice(id: Long, noticeRequestDto: NoticeRequestDto): Promise<void>
  deleteNotice(id: Long): Promise<void>
}