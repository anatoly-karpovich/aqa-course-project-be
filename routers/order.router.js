import Router  from "express";
import OrderController from "../controllers/order.controller.js";

const orderRouter = new Router() 

orderRouter.post('/orders', OrderController.create)
orderRouter.get('/orders', OrderController.getAll)
orderRouter.get('/orders/:id', OrderController.getOrder)
orderRouter.put('/orders', OrderController.update)
orderRouter.delete('/orders/:id', OrderController.delete)


export default orderRouter;