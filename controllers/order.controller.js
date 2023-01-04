import OrderService from "../services/order.service.js"
import { RESPONSE_STATUSES } from '../utils/constants.js'

class OrderController {
    async create(req, res) {
            try {
                const order = await OrderService.create(req.body)
                res.status(RESPONSE_STATUSES.created).json({...order, IsSuccess: true, ErrorMessage: null})
        } catch (e) {
            res.status(RESPONSE_STATUSES.server_error).json({IsSuccess: false, ErrorMessage: e.message})
        }
    }

    async getAll(req, res) {
        try {
            const orders = await OrderService.getAll()
            return res.status(200).json({Orders: orders, IsSuccess: true, ErrorMessage: null})
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({IsSuccess: false, ErrorMessage: e.message})
        }
    }

    async getOrder(req,res) {
        try {
            const order = await OrderService.getOrder(req.params.id)
            res.status(200).json({...order, IsSuccess: true, ErrorMessage: null})
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({IsSuccess: false, ErrorMessage: e.message})
        }
    }

    async update(req,res) {
        try {
            const updatedOrder = await OrderService.update(req.body)
            return res.status(200).json({...updatedOrder, IsSuccess: true, ErrorMessage: null})
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({IsSuccess: false, ErrorMessage: e.message})
        }
    }
    
    async delete(req,res) {
        try {
            const order = await OrderService.delete(req.params.id)
            return res.status(204).json(order)
        } catch(e) {
            res.status(RESPONSE_STATUSES.server_error).json({IsSuccess: false, ErrorMessage: e.message})
        }
    }
}

export default new OrderController()