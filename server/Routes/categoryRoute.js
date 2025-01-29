import express from 'express'
import categorycontroller from '../controller/categorycontroller.js'
import auth from '../middlewares/auth.js'
import authAdmin from '../middlewares/authAdmin.js'
const router=express.Router()

router
  .route("/category")
  .get(categorycontroller.getcategory)
  .post(auth,authAdmin, categorycontroller.createCategory);

router.route('/category/:id')
.delete(auth,authAdmin,categorycontroller.deleteCategory)
.put(auth,authAdmin,categorycontroller.updateCategory)

export default router