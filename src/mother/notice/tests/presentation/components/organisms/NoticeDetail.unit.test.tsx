import { shallow } from 'enzyme';
import * as React from 'react';
import NoticeDetail from 'src/mother/notice/presentation/components/organisms/NoticeDetail';
import { getNoticeFixture } from '../../../domain/model/Notice.unit.test';

describe("NoticeDetail test", () => {
  const notice = getNoticeFixture();

  test("Render_ValidInput_ValidOutput", () => {
    expect(
      shallow(<NoticeDetail notice={notice} pending={false} rejected={false} />)
        .contains(<div>
          {JSON.stringify(notice)}
          <br />
          pending: {JSON.stringify(false)}
          <br />
          rejected: {JSON.stringify(false)}
        </div>)
    ).toBe(true)
  })
})