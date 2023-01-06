import OrderService from "../services/order.service.js";
import { ORDER_STATUSES } from "../utils/constants.js";

export async function orderById(req, res, next) {
  try {
    const id = req.body._id || req.params.id
    const order = (await OrderService.getAll()).find(o => o._id === id)
    if(!order) {
      return res.status(404).json({ IsSuccess: false, ErrorMessage: `Order with id '${id}' wasn't found` });
    }
    next();
  } catch (e) {
    console.log(e);
  }
}

export async function orderStatus(req, res, next) {
    try {
      const status = req.body.status
      if(!ORDER_STATUSES.includes(status)) {
        return res.status(400).json({ IsSuccess: false, ErrorMessage: `'${status}' is not a valid status` });
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }