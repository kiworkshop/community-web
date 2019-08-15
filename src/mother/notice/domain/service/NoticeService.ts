import Page from "src/common/domain/model/Page";
import PageRequest from "src/common/domain/model/PageRequest";
import Notice from "../model/Notice";

export default interface NoticeService {
  getNotice(id: number): Promise<Notice>
  getNoticePage(pageRequest: PageRequest): Promise<Page<Notice>>
}