import { shallow } from 'enzyme';
import * as React from 'react';
import NoticeDetail from 'src/mother/notice/presentation/components/organisms/NoticeDetail';
import { getNoticeFixture } from '../../../domain/model/Notice.unit.test';

describe("NoticeDetail test", () => {
  const notice = getNoticeFixture();

  test("Render_ValidInput_ValidOutput", () => {
    expect(
      shallow(<NoticeDetail notice={notice} />)
        .contains(<div>{JSON.stringify(notice)}</div>)
    ).toBe(true)
  })
})