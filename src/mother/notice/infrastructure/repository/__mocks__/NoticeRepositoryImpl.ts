import NoticeRepository from "src/mother/notice/domain/NoticeRepository";

export const noticeRepository: NoticeRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  deleteById: jest.fn(),
}