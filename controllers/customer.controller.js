import CustomerService from "../services/customer.service.js"
import { RESPONSE_STATUSES } from '../utils/constants.js'

class CustomerController {
    async create(req, res) {
        try {
            const customer = await CustomerService.create(req.body)
            res.status(RESPONSE_STATUSES.created).json(customer)
        } catch (e) {
            res.status(RESPONSE_STATUSES.server_error).json({ErrorMessage: e.message})
        }
    }

    async getAll(req, res) {
        try {
            const customer = await CustomerService.getAll()
            return res.json({Customers: customer, IsSuccess: true, ErrorMessage: null})
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({ErrorMessage: e.message})
        }
    }

    async getCustomer(req,res) {
        try {
            const customer = await CustomerService.getCustomer(req.params.id)
            return res.json(customer)
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({ErrorMessage: e.message})
        }
    }

    async update(req,res) {
        try {
            const updatedCustomer = await CustomerService.update(req.body)
            return res.json(updatedCustomer)
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({ErrorMessage: e.message})
        }
    }

    async partiallyUpdate(req,res) {
        try {
            const updatedCustomer = await CustomerService.partiallyUpdate(req.body)
            return res.json(updateupdatedCustomerdProduct)
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({ErrorMessage: e.message})
        }
    }
    
    async delete(req,res) {
        try {
            const customer = await CustomerService.delete(req.params.id)
            return res.status(204).json({Customer: customer, IsSuccess: true, ErrorMessage: null})
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({ErrorMessage: e.message})
        }
    }
}

export default new CustomerController()