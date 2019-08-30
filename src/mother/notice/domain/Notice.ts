import { Id } from "src/common/domain/Id";

export default interface Notice {
  id: Id;
  title: string;
  content: string;
}