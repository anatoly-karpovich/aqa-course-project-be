import OrderStatusService from "../services/orderStatus.service.js"

class OrderStatusController {
    async update(req, res) {
        try {
            const updatedOrder = await OrderStatusService.updateStatus(req.body);
            return res.json({Order: updatedOrder, IsSuccess: true, ErrorMessage: null});
          } catch (e) {
            res.status(500).json({IsSuccess: false, ErrorMessage: e.message})
          }
    }
}

export default new OrderStatusController()