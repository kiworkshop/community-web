import "reflect-metadata"
import NoticeRepository from "src/mother/notice/domain/repository/NoticeRepository";
import NoticeService from "src/mother/notice/domain/service/NoticeService";
import NoticeServiceImpl from "src/mother/notice/infrastructure/service/NoticeServiceImpl";
import { getNoticeFixture } from "../../domain/model/Notice.unit.test";

describe("NoticeServiceImpl test", () => {
  const mockNoticeRepository: NoticeRepository = {
    findById: jest.fn().mockResolvedValue(getNoticeFixture())
  }

  const noticeService: NoticeService = new NoticeServiceImpl();
  Reflect.set(noticeService, "noticeRepository", mockNoticeRepository);

  test("getNotice_ValidInput_ValidOutput", async () => {
    const notice = await noticeService.getNotice(1);

    expect(mockNoticeRepository.findById).toBeCalledWith(1);
    expect(notice.id).toBeTruthy()
    expect(notice.title).toBeTruthy()
    expect(notice.content).toBeTruthy()
  })
})