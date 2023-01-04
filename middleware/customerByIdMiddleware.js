import CustomerService from "../services/customer.service.js";

export async function customerByIdMiddleware(req, res, next) {
  try {
    const id = req.body._id || req.params.id
    const customer = await CustomerService.getCustomer(id);
    if(!customer) {
      return res.status(404).json({ ErrorMessage: `Customer with id '${id}' wasn't found` });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(404).json({ ErrorMessage: `Customer with id '${e.value}' wasn't found` });
  }
}
