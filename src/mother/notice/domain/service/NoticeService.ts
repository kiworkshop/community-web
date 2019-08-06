import Notice from "../model/Notice";

export default interface NoticeService {
  getNotice(id: number): Promise<Notice>
}