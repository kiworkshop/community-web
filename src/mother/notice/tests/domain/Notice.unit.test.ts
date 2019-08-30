import Long from 'src/common/domain/Long';
import Notice from "src/mother/notice/domain/Notice";

export const getNoticeFixture = (): Notice => ({
  "id": new Long(1),
  "title": "title",
  "content": "content"
})

test('fixture test', () => {
  expect(getNoticeFixture()).toStrictEqual({
    "id": new Long(1),
    "title": "title",
    "content": "content"
  })
})