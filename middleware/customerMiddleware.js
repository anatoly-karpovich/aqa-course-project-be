import { isValidInput } from "../utils/validations.js";
import { VALIDATION_ERROR_MESSAGES, COUNTRIES, CUSTOMER_REQUIRED_KEYS } from "../utils/validations.js";

export function customerMiddleware(req, res, next) {
  try {
    CUSTOMER_REQUIRED_KEYS.forEach((key) => {
      if (!Object.keys(req.body).includes(key)) {
        return res.status(400).json({ ErrorMessage: `Missing '${key}' key` });
      }
    });
    if (!isValidInput("Name", req.body.name) || (req.body.name && req.body.name.trim().length !== req.body.name.length)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Customer Name"] });
    }
    if (!isValidInput("City", req.body.city) || (req.body.city && req.body.city.trim().length !== req.body.city.length)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["City"] });
    }
    if (!isValidInput("Address", req.body.address) || (req.body.address && req.body.address.trim().length !== req.body.address.length)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Address"] });
    }
    if (!isValidInput("Email", req.body.email) || (req.body.email && req.body.email.trim().length !== req.body.email.length)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Email"] });
    }
    if (!isValidInput("Phone", req.body.phone) || (req.body.phone && req.body.phone.trim().length !== req.body.phone.length)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Phone"] });
    }
    if (!COUNTRIES.includes(req.body.country) || (req.body.country && req.body.country.trim().length !== req.body.country.length)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Country"] });
    }
    if (req.body.notes && (!isValidInput("Notes", req.body.notes) || req.body.notes.trim().length !== req.body.notes.length)) {
      return res.status(400).json({ ErrorMessage: VALIDATION_ERROR_MESSAGES["Notes"] });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ ErrorMessage: e.message });
  }
}
