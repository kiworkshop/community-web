import assert from "assert-plus"

export default class Notice {
  public static builder() {
    const fields = {} as Notice
    const builder = {
      id: (id: number) => {
        fields.id = id;
        return builder;
      },
      title: (title: string) => {
        fields.title = title;
        return builder;
      },
      content: (content: string) => {
        fields.content = content;
        return builder;
      },
      build: () => new Notice(fields)
    }
    return builder;
  }

  public id: number = -1;
  public title: string = "";
  public content: string = "";

  private constructor({ id, title, content }: any) {
    assert.ok(title.trim().length > 0, "title must not be blank.")
    assert.ok(content.trim().length > 0, "content must not be blank.")

    this.id = id;
    this.title = title;
    this.content = content;
  }
}