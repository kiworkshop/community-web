import Axios from 'axios';
import Id from 'src/common/domain/model/Id';
import Page from 'src/common/domain/model/Page';
import PageRequest from 'src/common/domain/model/PageRequest';
import CommonErrorServiceImpl from 'src/common/infrastructure/service/CommonErrorServiceImpl';
import { MjArticle } from '../../domain/model/MjArticle';
import MjArticleRepository from '../../domain/repository/MjArticleRepository'

const MJ_ARTICLE_REPO_URL = `${process.env.CONTENT_API}/myeongjae/articles`

export const mjArticleRepository: MjArticleRepository = {
  findById: (id: Id): Promise<MjArticle> => new Promise((resolve, rejected) => {
    Axios.get<MjArticle>(`${MJ_ARTICLE_REPO_URL}/${id}`)
      .then(({ data }) => resolve(data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  findAll: ({ page, size, sort = "id,desc" }: PageRequest): Promise<Page<MjArticle>> =>
    new Promise((resolve, rejected) => {
      Axios.get<Page<MjArticle>>(MJ_ARTICLE_REPO_URL, {
        params: {
          page, size, sort
        }
      })
        .then(({ data }) => resolve(data))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
    }),

  save: (mjArticle: MjArticle): Promise<Id> => {
    if (mjArticle.id > 0) {
      return new Promise((resolve, rejected) => {
        Axios.put<void>(`${MJ_ARTICLE_REPO_URL}/${mjArticle.id}`, mjArticle)
          .then(() => resolve(mjArticle.id))
          .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
      })
    }

    return new Promise((resolve, rejected) => {
      Axios.post<Id>(MJ_ARTICLE_REPO_URL, mjArticle)
        .then(({ data: id }) => resolve(id))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
    })
  },

  deleteById: (id: Id): Promise<void> => new Promise((resolve, rejected) => {
    Axios.delete<void>(`${MJ_ARTICLE_REPO_URL}/${id}`)
      .then(() => resolve())
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  })
}