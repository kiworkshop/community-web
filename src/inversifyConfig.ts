import { Container } from "inversify";
import "reflect-metadata";
import CommonErrorService from "src/common/domain/service/CommonErrorService";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { inversifyIds } from 'src/inversifyIds'
import NoticeRepository from "src/mother/notice/domain/repository/NoticeRepository"
import NoticeService from "src/mother/notice/domain/service/NoticeService"
import NoticeRepositoryImpl from "src/mother/notice/infrastructure/repository/NoticeRepositoryImpl"
import NoticeServiceImpl from "src/mother/notice/infrastructure/service/NoticeServiceImpl"

const { mother, common } = inversifyIds;

const inversifyContainer = new Container();

inversifyContainer.bind<NoticeRepository>(mother.notice.NoticeRepository).to(NoticeRepositoryImpl);
inversifyContainer.bind<NoticeService>(mother.notice.NoticeService).to(NoticeServiceImpl);
inversifyContainer.bind<CommonErrorService>(common.CommonErrorService).to(CommonErrorServiceImpl);

export { inversifyContainer };