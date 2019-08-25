import "reflect-metadata"
import NoticeServiceImpl from "src/mother/notice/infrastructure/service/NoticeServiceImpl";
import NoticeRepository from "../../domain/NoticeRepository";
import NoticeService from "../../service/NoticeService";
import { getNoticeFixture } from "../domain/Notice.unit.test";

describe("NoticeServiceImpl test", () => {
  const mockNoticeRepository: NoticeRepository = {
    findById: jest.fn(),
    findAll: jest.fn()
  }

  const noticeService: NoticeService = new NoticeServiceImpl(mockNoticeRepository);

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