import assert from "assert-plus"
import Properties from "src/common/domain/model/Properties";

export default class Notice {
  public static builder() {
    const properties = {} as Properties<Notice>
    const builder = {
      id: (id: number) => {
        properties.id = id;
        return builder;
      },
      title: (title: string) => {
        properties.title = title;
        return builder;
      },
      content: (content: string) => {
        properties.content = content;
        return builder;
      },
      build: () => new Notice(properties)
    }
    return builder;
  }

  public id: number = -1;
  public title: string = "";
  public content: string = "";

  private constructor({ id, title, content }: Properties<Notice>) {
    assert.ok(title.trim().length > 0, "title must not be blank.")
    assert.ok(content.trim().length > 0, "content must not be blank.")

    this.id = id;
    this.title = title;
    this.content = content;
  }
}