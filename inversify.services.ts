import { inversifyContainer } from "inversify.config";
import { inversifyIds } from "src/inversify.id";
import NoticeService from "src/mother/notice/domain/service/NoticeService";

const inversifyServices = {
  cms: {
    mother: {
      notice: {
        service: inversifyContainer.get<NoticeService>(inversifyIds.mother.notice.NoticeService)
      }
    }
  }
}

export default inversifyServices