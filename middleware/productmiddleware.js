import { isValidInput } from "../utils/validations.js";
import { VALIDATION_ERROR_MESSAGES, MANUFACTURERS } from "../utils/validations.js";

export function productMiddleware(req, res, next) {
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
