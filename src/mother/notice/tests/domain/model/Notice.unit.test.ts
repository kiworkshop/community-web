import Notice from "src/mother/notice/domain/model/Notice";

export const getNoticeFixture = (id?: number) => Notice.builder()
  .id(id || 1)
  .title("title")
  .content("content").build();

describe("Notice test", () => {
  test("build_ValidInput_ValidOutput", () => {
    const notice = Notice.builder()
      .id(1)
      .title("title")
      .content("content").build();

    expect(notice.id).toBe(1);
    expect(notice.title).toBe("title");
    expect(notice.content).toBe("content");
  });

  [{
    title: " \n\t",
    content: "content"
  }, {
    title: "title",
    content: " \n\t"
  }].forEach(({ title, content }) =>
    test("build_BlankField_ThrowError", () => {
      expect(() => Notice.builder()
        .id(1)
        .title(title)
        .content(content).build()).toThrowError();
    }))
})