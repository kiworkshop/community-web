import CommonErrorService from "src/common/service/CommonErrorService";
import { inversifyContainer } from "src/inversifyConfig";
import { inversifyIds } from "src/inversifyIds";
import NoticeService from "src/mother/notice/service/NoticeService";
import I18NService from "./common/service/I18NService";

const inversifyServices = {
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

export default inversifyServices