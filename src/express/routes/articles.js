'use strict';

const {Router} = require(`express`);
const {modifyArticle, sendArticle, renderPostForm} = require(`../lib/articles`);
const upload = require(`../middlewares/upload`);
const articlesRouter = new Router();
const api = require(`../api`).getAPI();

articlesRouter.get(`/category/:id`, (req, res) => {
  const {id} = req.params;
  const article = api.getArticle({id, comments: 1});
  res.render(`articles-by-category`, {article});
});

articlesRouter.get(`/add`, renderPostForm);
articlesRouter.get(`/edit/:id`, renderPostForm);

articlesRouter.post(`/add`, upload.single(`picture`), sendArticle);
articlesRouter.put(`/edit/:id`, upload.single(`picture`), sendArticle);

articlesRouter.get(`/:id`, async (req, res, next) => {
  const {id} = req.params;

  try {
    const article = await api.getArticle({id});
    res.render(`post`, {article: modifyArticle(article)});
  } catch (err) {
    next();
  }
});

module.exports = articlesRouter;
