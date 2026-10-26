import Product from '../models/Product.js';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/seedData.js';

// Get all products with filtering, search, sorting
export const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, inStock, sort, limit = 100, page = 1 } = req.query;

    const query = {};

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // In-stock filter
    if (inStock === 'true') {
      query.inStock = true;
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search query
    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { categoryName: { $regex: q, $options: 'i' } },
        { material: { $regex: q, $options: 'i' } },
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'popular') sortOption = { reviewsCount: -1 };

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi tải sản phẩm', error: error.message });
  }
};

// Get single product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findOne({ id });
    if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};

// Create product (Admin)
export const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const newId = data.id || `prod-${Date.now()}`;

    const newProduct = new Product({
      ...data,
      id: newId,
    });

    const saved = await newProduct.save();
    res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Không thể tạo sản phẩm', error: error.message });
  }
};

// Update product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm để cập nhật' });
    }

    res.json({ success: true, message: 'Cập nhật sản phẩm thành công', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Không thể cập nhật sản phẩm', error: error.message });
  }
};

// Delete product (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findOneAndDelete({ id });
    if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findByIdAndDelete(id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm để xóa' });
    }

    res.json({ success: true, message: 'Đã xóa sản phẩm thành công', id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi xóa sản phẩm', error: error.message });
  }
};
