import Order from '../models/Order.js';

// Get all orders (Admin or customer)
export const getOrders = async (req, res) => {
  try {
    const { status, phone, email, limit = 50 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (phone) query['customer.phone'] = phone;
    if (email) query['customer.email'] = email;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi tải đơn hàng', error: error.message });
  }
};

// Create new order (Customer checkout)
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const orderCode = orderData.orderCode || `VT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = new Order({
      ...orderData,
      orderCode,
    });

    const saved = await newOrder.save();
    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công!',
      data: saved,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Không thể tạo đơn hàng', error: error.message });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let order = await Order.findOneAndUpdate(
      { $or: [{ id }, { orderCode: id }] },
      { status },
      { new: true }
    );

    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    res.json({ success: true, message: 'Cập nhật trạng thái đơn thành công', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Lỗi khi cập nhật trạng thái', error: error.message });
  }
};

// Delete order (Admin)
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let order = await Order.findOneAndDelete({ $or: [{ id }, { orderCode: id }] });
    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findByIdAndDelete(id);
    }
    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa đơn hàng thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi xóa đơn hàng', error: error.message });
  }
};
