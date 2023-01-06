import Order from "../models/order.model.js";
import CustomerService from "./customer.service.js";
import ProductsService from "./products.service.js";

class OrderStatusService {

    async updateStatus(order) {
        if(!order._id) {
            throw new Error( 'Id was not provided') 
        }
        const updatedOrder = await Order.findByIdAndUpdate(order._id, order, {new: true})
        updatedOrder.customer = await CustomerService.getCustomer(updatedOrder.customer);
        const requestedProducts = await Promise.all(updatedOrder.requestedProducts.map(async (id) => (await ProductsService.getProduct(id))._doc));
        return { ...updatedOrder._doc, requestedProducts };
    }
}

export default new OrderStatusService()