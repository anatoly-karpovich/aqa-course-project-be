import ProductsService from "../services/products.service.js";

export async function productByIdMiddleware(req, res, next) {
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
