import Router  from "express";
import CustomerController from "../controllers/customer.controller.js";
import { customerMiddleware } from "../middleware/customerMiddleware.js";
import { customerByIdMiddleware } from "../middleware/customerByIdMiddleware.js";

const customerRouter = new Router() 

customerRouter.post('/customers', customerMiddleware, CustomerController.create)
customerRouter.get('/customers', CustomerController.getAll)
customerRouter.get('/customers/:id', customerByIdMiddleware, CustomerController.getCustomer)
customerRouter.put('/customers', CustomerController.update)
customerRouter.patch('/customers', CustomerController.partiallyUpdate)
customerRouter.delete('/customers/:id', customerByIdMiddleware, CustomerController.delete)


export default customerRouter;