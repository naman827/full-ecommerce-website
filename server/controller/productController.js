import Products from "../models/productModel.js";

// Filtering, sorting, and pagination
class APIfeatures {
  constructor(query, queryString) {
    this.query = query; // Mongoose query object
    this.queryString = queryString; // Request query parameters
  }

  filtering() {
    const queryObj = { ...this.queryString }; // Clone query parameters
    const excludedFields = ["page", "sort", "limit"]; // Fields to exclude from filtering
    excludedFields.forEach((el) => delete queryObj[el]); // Remove excluded fields

    let queryStr = JSON.stringify(queryObj); // Convert query object to string
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => `$${match}` // Add MongoDB operators (e.g., $gte, $lte)
    );
    this.query.find(JSON.parse(queryStr)); // Apply filters to the query
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" "); // Handle multiple sort fields
      this.query = this.query.sort(sortBy); // Apply sorting
    } else {
      this.query = this.query.sort("-createdAt"); // Default sort by creation date (descending)
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1; // Convert to number, default to 1
    const limit = this.queryString.limit * 1 || 9; // Convert to number, default to 9
    const skip = (page - 1) * limit; // Calculate how many documents to skip

    this.query = this.query.skip(skip).limit(limit); // Apply skip and limit
    return this;
  }
}

const productController = {
  // Get all products
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const products = await features.query; // Execute the query
      res.json(products); // Return the products
    } catch (error) {
      return res.status(500).json({ msg: error.message }); // Handle errors
    }
  },

  // Create a new product
  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        contents,
        images,
        category,
      } = req.body;

      if (!product_id)
        return res.status(400).json({ msg: "Product ID is required" });
      if (!title) return res.status(400).json({ msg: "Title is required" });
      if (!images) return res.status(400).json({ msg: "Images are required" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        contents,
        category,
        images,
      });

      await newProduct.save();
      res.json({ msg: "Product added successfully" });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ msg: "Product with this ID already exists" });
      }
      return res.status(500).json({ msg: error.message });
    }
  },

  // Delete a product by ID
  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // Update a product by ID
  updateProducts: async (req, res) => {
    try {
      const { title, price, description, contents, images, category } =
        req.body;

      if (!images) return res.status(400).json({ msg: "Images are required" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          contents,
          category,
          images,
        }
      );

      res.json({ msg: "Product updated successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default productController;
