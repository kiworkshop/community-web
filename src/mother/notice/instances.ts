import NoticeRepository from './domain/repository/NoticeRepository'
import NoticeService from './domain/service/NoticeService';
import NoticeRepositoryImpl from './infrastructure/repository/NoticeRepositoryImpl'
import NoticeServiceImpl from './infrastructure/service/NoticeServiceImpl';

const noticeRepository: NoticeRepository = new NoticeRepositoryImpl();
export const noticeService: NoticeService = new NoticeServiceImpl(noticeRepository);