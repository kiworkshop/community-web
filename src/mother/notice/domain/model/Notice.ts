import assert from "assert-plus"

export default class Notice {
  public static of(noticeDto: {
    id: number,
    title: string,
    content: string
  }) {
    assert.ok(noticeDto.id > 0, "notice id must be a positive number.");
    assert.ok(noticeDto.title.trim().length > 0, "title must not be blank.")
    assert.ok(noticeDto.content.trim().length > 0, "content must not be blank.")

    return new Notice(noticeDto);
  }

  public id: number = -1;
  public title: string = "";
  public content: string = "";

  private constructor({ id, title, content }: any) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}