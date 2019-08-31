import "reflect-metadata"
import NoticeServiceImpl from "src/mother/notice/infrastructure/service/NoticeServiceImpl";
import NoticeRequestDto from "../../api/dto/NoticeRequestDto";
import NoticeRepository from "../../domain/NoticeRepository";
import NoticeService from "../../service/NoticeService";
import { getNoticeFixture } from "../domain/Notice.unit.test";

describe("NoticeServiceImpl test", () => {
  const mockNoticeRepository: NoticeRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    deleteById: jest.fn(),
  }

  const noticeService: NoticeService = new NoticeServiceImpl(mockNoticeRepository);

  test("getNotice_ValidInput_ValidOutput", async () => {
    // given
    (mockNoticeRepository.findById as jest.Mock).mockResolvedValue(getNoticeFixture());
    const id = 1;

    // when
    const notice = await noticeService.getNotice(id);

    // then
    expect(mockNoticeRepository.findById).toBeCalledWith(id);
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

  test("postNotice_ValidInput_ValidOutput", async () => {
    // given
    (mockNoticeRepository.save as jest.Mock).mockResolvedValue(1);
    const noticeRequestDto: NoticeRequestDto = NoticeRequestDto.of({ title: "title", content: "content" });

    // when
    const id = await noticeService.postNotice(noticeRequestDto);

    // then
    expect(mockNoticeRepository.save).toBeCalledWith({ id: -1, title: "title", content: "content" });
    expect(id).toBe(1);
  })

  test("putNotice_ValidInput_ValidOutput", async () => {
    // given
    (mockNoticeRepository.save as jest.Mock).mockResolvedValue("1");
    const noticeRequestDto: NoticeRequestDto = NoticeRequestDto.of({ title: "title", content: "content" });

    // expect
    expect(await noticeService.putNotice(1, noticeRequestDto)).toBeUndefined();

    expect(mockNoticeRepository.save).toBeCalledWith({ id: 1, title: "title", content: "content" });
  })
})