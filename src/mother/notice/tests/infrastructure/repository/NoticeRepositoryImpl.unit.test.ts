import _Axios from 'axios';
jest.mock('axios')

import { Page } from 'csstype';
import 'reflect-metadata'
import RepositoryError from 'src/common/domain/model/RepositoryError';
import CommonErrorServiceImpl from 'src/common/infrastructure/service/CommonErrorServiceImpl';
import { getRepositoryErrorFixture } from 'src/common/tests/domain/model/RepositoryError.unit.test';
import Notice from 'src/mother/notice/domain/model/Notice';
import NoticeRepository from 'src/mother/notice/domain/repository/NoticeRepository';
import NoticeRepositoryImpl from 'src/mother/notice/infrastructure/repository/NoticeRepositoryImpl';

describe("NoticeRepositoryImpl test", () => {
  const noticeRepository: NoticeRepository = new NoticeRepositoryImpl();
  Reflect.set(noticeRepository, "commonErrorService", new CommonErrorServiceImpl());

  const Axios = _Axios as jest.Mocked<typeof _Axios>

  test("findById_ValidInput_ValidOutput", async () => {
    // given
    const response = {
      data: {
        "id": 1,
        "title": "title",
        "content": "content"
      } as Notice
    }
    Axios.get.mockReturnValue(Promise.resolve(response));

    // when
    const res = await noticeRepository.findById(1);

    // then
    expect(res.id).toBe(1);
    expect(res.title).toBe("title");
    expect(res.content).toBe("content");
  })

  test("findById_RepositoryError_ThrowException", async () => {
    // given
    const { timestamp, status, error, message } = getRepositoryErrorFixture();
    Axios.get.mockReturnValue(Promise.reject({ timestamp, status, error, message }));

    // when
    let repositoryError;
    try {
      await noticeRepository.findById(1);
    } catch (e) {
      repositoryError = e;
    }

    // then
    expect(repositoryError).toBeInstanceOf(RepositoryError);
    expect(repositoryError.timestamp).toBe(timestamp);
    expect(repositoryError.status).toBe(status);
    expect(repositoryError.error).toBe(error);
    expect(repositoryError.message).toBe(message);
  })

  test("findById_ValidInput_ValidOutput", async () => {
    // given
    const response = {
      data: {
        content: [{
          "id": 1,
          "title": "title",
          "content": "content"
        }]
      } as Page<Notice>
    }
    Axios.get.mockReturnValue(Promise.resolve(response));

    // when
    const res = await noticeRepository.findAll({ page: 1, size: 10 });

    // then
    expect(res.content.length).toBe(1);
    expect(res.content[0]).toStrictEqual({
      "id": 1,
      "title": "title",
      "content": "content"
    });
  })
})