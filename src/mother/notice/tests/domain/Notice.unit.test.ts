import { Id } from "src/common/domain/Id";
import Notice from "src/mother/notice/domain/Notice";

export const getNoticeFixture = (): Notice => ({
  "id": new Id(1),
  "title": "title",
  "content": "content"
})

test('fixture test', () => {
  expect(getNoticeFixture()).toStrictEqual({
    "id": new Id(1),
    "title": "title",
    "content": "content"
  })
})