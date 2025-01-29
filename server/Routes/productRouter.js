import express from 'express'
import productController from '../controller/productController.js'
// import auth from '../middlewares/auth.js'
// import authAdmin from '../middlewares/authAdmin.js'
const router = express.Router()

router
  .route("/products")
  .get(productController.getProducts)
  .post(productController.createProducts);

router
  .route("/products/:id")
  .delete(productController.deleteProducts)
  .put(productController.updateProducts);

export default router