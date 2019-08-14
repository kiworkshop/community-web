import CommonErrorService from "src/common/domain/service/CommonErrorService";
import { inversifyContainer } from "src/inversifyConfig";
import { inversifyIds } from "src/inversifyIds";
import NoticeService from "src/mother/notice/domain/service/NoticeService";
import I18NService from "./common/domain/service/I18NService";

const inversifyServices = {
  cms: {
    common: {
      errorService: inversifyContainer.get<CommonErrorService>(inversifyIds.common.CommonErrorService),
      i18NService: I18NService
    },
    mother: {
      notice: {
        service: inversifyContainer.get<NoticeService>(inversifyIds.mother.notice.NoticeService)
      }
    }
  }
}

export default inversifyServices