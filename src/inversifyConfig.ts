import { Container } from "inversify";
import "reflect-metadata";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import CommonErrorService from "src/common/service/CommonErrorService";
import { inversifyIds } from 'src/inversifyIds';
import NoticeRepository from "src/mother/notice/domain/NoticeRepository";
import NoticeRepositoryImpl from "src/mother/notice/infrastructure/repository/NoticeRepositoryImpl";
import NoticeServiceImpl from "src/mother/notice/infrastructure/service/NoticeServiceImpl";
import NoticeService from "src/mother/notice/service/NoticeService";

const { mother, common } = inversifyIds;

const inversifyContainer = new Container();

inversifyContainer.bind<NoticeRepository>(mother.notice.NoticeRepository).to(NoticeRepositoryImpl);
inversifyContainer.bind<NoticeService>(mother.notice.NoticeService).to(NoticeServiceImpl);
inversifyContainer.bind<CommonErrorService>(common.CommonErrorService).to(CommonErrorServiceImpl);

export { inversifyContainer };
