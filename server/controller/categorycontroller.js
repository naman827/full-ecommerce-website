import Category from "../models/categoryModel.js";

const categorycontroller = {
  getcategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "category already exists" });

      const newCategory = new Category({ name });
      await newCategory.save()
      res.json("access granted as admin");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory:async(req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({msg:"category deleted"})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
  },
  updateCategory:async(req,res)=>{
    try {
        const {name}=req.body
        await Category.findByIdAndUpdate({_id:req.params.id},{name})
        res.json({msg:"category updated"})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
  }
};

export default categorycontroller;
