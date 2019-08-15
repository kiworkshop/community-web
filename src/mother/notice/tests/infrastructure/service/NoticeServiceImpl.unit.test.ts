import "reflect-metadata"
import NoticeRepository from "src/mother/notice/domain/repository/NoticeRepository";
import NoticeService from "src/mother/notice/domain/service/NoticeService";
import NoticeServiceImpl from "src/mother/notice/infrastructure/service/NoticeServiceImpl";
import { getNoticeFixture } from "../../domain/model/Notice.unit.test";

describe("NoticeServiceImpl test", () => {
  const mockNoticeRepository: NoticeRepository = {
    findById: jest.fn(),
    findAll: jest.fn()
  }

  const noticeService: NoticeService = new NoticeServiceImpl();
  Reflect.set(noticeService, "noticeRepository", mockNoticeRepository);

  test("getNotice_ValidInput_ValidOutput", async () => {
    // given
    (mockNoticeRepository.findById as jest.Mock).mockResolvedValue(getNoticeFixture());

    // when
    const notice = await noticeService.getNotice(1);

    // then
    expect(mockNoticeRepository.findById).toBeCalledWith(1);
    expect(notice.id).toBeTruthy()
    expect(notice.title).toBeTruthy()
    expect(notice.content).toBeTruthy()
  })

  test("getNoticePage_ValidInput_ValidOutput", async () => {
    // given
    (mockNoticeRepository.findAll as jest.Mock).mockResolvedValue({ content: [getNoticeFixture()] });

    // when
    const noticePage = await noticeService.getNoticePage({ page: 1, size: 10 });

    // then
    expect(mockNoticeRepository.findAll).toBeCalledWith({ page: 1, size: 10 });
    expect(noticePage.content.length).toBe(1);
    expect(noticePage.content[0]).toStrictEqual(getNoticeFixture());
  })
})