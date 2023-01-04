import Order from "../models/order.model.js";
import CustomerService from "./customer.service.js";
import ProductsService from "./products.service.js";

class OrderService {
  async create(order) {
    const createdOrder = Object.assign(await Order.create(order));
    createdOrder.customer = await CustomerService.getCustomer(createdOrder.customer);
    const requestedProducts = await Promise.all(await createdOrder.requestedProducts.map(async (id) => (await ProductsService.getProduct(id))._doc));
    return { Order: { ...createdOrder._doc, requestedProducts } };
  }

  async getAll() {
    const ordersFromDB = await Order.find();
    let orders = ordersFromDB.map(async (order) => {
      return {
        ...order._doc,
        customer: await CustomerService.getCustomer(order.customer),
        requestedProducts: await Promise.all(order.requestedProducts.map(async (id) => (await ProductsService.getProduct(id))._doc)),
      };
    });
    return Promise.all(orders);
  }

  async getOrder(id) {
    if (!id) {
      throw new Error("Id was not provided");
    }
    const orderFromDB = await Order.findById(id);
    orderFromDB.customer = await CustomerService.getCustomer(orderFromDB.customer);
    const requestedProducts = await Promise.all(orderFromDB.requestedProducts.map(async (id) => (await ProductsService.getProduct(id))._doc));
    return { Order: { ...orderFromDB._doc, requestedProducts } };
  }

  async update(order) {
    if (!order._id) {
      throw new Error("Id was not provided");
    }
    const updatedOrder = await Order.findByIdAndUpdate(order._id, order, { new: true });
    updatedOrder.customer = await CustomerService.getCustomer(updatedOrder.customer);
    const requestedProducts = await Promise.all(updatedOrder.requestedProducts.map(async (id) => (await ProductsService.getProduct(id))._doc));
    return { Order: { ...updatedOrder._doc, requestedProducts } };
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id was not provided");
    }
    const order = await Order.findByIdAndDelete(id);
    return order;
  }
}

export default new OrderService();
