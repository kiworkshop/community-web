import CommonErrorService from "src/common/domain/service/CommonErrorService";
import { inversifyContainer } from "src/inversify.config";
import { inversifyIds } from "src/inversify.id";
import NoticeService from "src/mother/notice/domain/service/NoticeService";

const inversifyServices = {
  cms: {
    common: {
      errorService: inversifyContainer.get<CommonErrorService>(inversifyIds.common.CommonErrorService)
    },
    mother: {
      notice: {
        service: inversifyContainer.get<NoticeService>(inversifyIds.mother.notice.NoticeService)
      }
    }
  }
}

export default inversifyServices