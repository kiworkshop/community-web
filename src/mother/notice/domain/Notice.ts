import Long from 'src/common/domain/Long';

export default interface Notice {
  id: Long;
  title: string;
  content: string;
}