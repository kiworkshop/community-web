import { shallow } from "enzyme";
import NoticeDetailPage from "pages/cms/mother/notice/detail";
import NoticeDetailContainer from "src/mother/notice/presentation/containers/NoticeDetailContainer";

describe("notice detail page test", () => {
  test("renderDetail_ValidInput_ValidOutput", () => {
    expect(
      shallow(<NoticeDetailPage />)
        .contains(<NoticeDetailContainer />)
    ).toBe(true)
  })
})