import { Router } from 'express'

import { authorizationHandler, jsonBodyParser } from '../helpers/index.js'

import {
  getProductsHandler,
  addCommentHandler,
  removeCommentHandler,
  getCommentsHandler,
  toggleLikeProductHandler,
  toggleDislikeProductHandler,
  saveProductHandler,
  getProductDetailsHandler,
  searchProductsHandler
} from './handlers/index.js'


const productsRouter = Router()

productsRouter.get('/', authorizationHandler, getProductsHandler)
productsRouter.post('/:productId/comments', authorizationHandler, jsonBodyParser, addCommentHandler)
productsRouter.delete('/:productId/comments/:commentId', authorizationHandler, removeCommentHandler)
productsRouter.get('/:productId/comments', authorizationHandler, getCommentsHandler)
productsRouter.patch('/:productId/likes', authorizationHandler, toggleLikeProductHandler)
productsRouter.patch('/:productId/dislikes', authorizationHandler, toggleDislikeProductHandler)
productsRouter.patch('/:productId/save', authorizationHandler, saveProductHandler)
productsRouter.get('/search', authorizationHandler, searchProductsHandler)
productsRouter.get('/:productId', authorizationHandler, getProductDetailsHandler)


export default productsRouter