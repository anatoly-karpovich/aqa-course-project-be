import Router  from "express";
import CustomerController from "../controllers/customer.controller.js";
import { customerValidations, customerById } from "../middleware/customerMiddleware.js";

const customerRouter = new Router() 

customerRouter.post('/customers', customerValidations, CustomerController.create)
customerRouter.get('/customers', CustomerController.getAll)
customerRouter.get('/customers/:id', customerById, CustomerController.getCustomer)
customerRouter.put('/customers', CustomerController.update)
customerRouter.patch('/customers', CustomerController.partiallyUpdate)
customerRouter.delete('/customers/:id', customerById, CustomerController.delete)


export default customerRouter;