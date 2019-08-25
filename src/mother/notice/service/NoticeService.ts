import Page from "src/common/domain/Page";
import PageRequest from "src/common/domain/PageRequest";
import Notice from "../domain/Notice";

export default interface NoticeService {
  getNotice(id: number): Promise<Notice>
  getNoticePage(pageRequest: PageRequest): Promise<Page<Notice>>
}