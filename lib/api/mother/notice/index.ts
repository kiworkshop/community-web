import Axios from 'axios'
import INoticeResponseDto from './dto/INoticeResponse';

export function getNoticeAPI(id: number): Promise<INoticeResponseDto> {
  return new Promise((resolve, rejected) => {
    Axios.get<INoticeResponseDto>(`http://localhost:8080/notices/${id}`)
      .then(res => resolve(res.data))
      .catch(e => rejected(e));
  })
}