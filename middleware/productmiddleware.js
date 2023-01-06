import { isValidInput } from "../utils/validations.js";
import { VALIDATION_ERROR_MESSAGES, MANUFACTURERS } from "../utils/validations.js";
import ProductsService from "../services/products.service.js";


export function productValidations(req, res, next) {
  try {
    if (!isValidInput("Product Name", req.body.name)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Product Name"] });
    }
    if (!isValidInput("Amount", req.body.amount)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Amount"] });
    }
    if (!isValidInput("Price", req.body.price)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Price"] });
    }
    if (req.body.notes && !isValidInput("Notes", req.body.notes)) {
        return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Notes"] });
    }
    if (!MANUFACTURERS.includes(req.body.manufacturer)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Manufacturer"] });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ ErrorMessage: e.message });
  }
}

export async function productById(req, res, next) {
  try {
    const id = req.body._id || req.params.id
    const product = await ProductsService.getProduct(id);
    if(!product) {
      return res.status(404).json({ ErrorMessage: `Product with id '${id}' wasn't found` });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(404).json({ ErrorMessage: `Product with id '${e.value}' wasn't found` });
  }
}
