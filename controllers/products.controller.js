import ProductsService from "../services/products.service.js";

class ProductsController {
  async create(req, res) {
    try {
      const product = await ProductsService.create(req.body);
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ ErrorMessage: e.message });
    }
  }

  async getAll(req, res) {
    try {
      const products = await ProductsService.getAll();
      return res.json(products);
    } catch (e) {
      res.status(500).json({ ErrorMessage: e.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await ProductsService.getProduct(req.params.id);
      return res.json(product);
    } catch (e) {
      res.status(500).json({ ErrorMessage: e.message });
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductsService.update(req.body);
      return res.json(updatedProduct);
    } catch (e) {
      res.status(500).json({ ErrorMessage: e.message });
    }
  }

  async partiallyUpdate(req, res) {
    try {
      const updatedProduct = await ProductsService.partiallyUpdate(req.body);
      return res.json(updatedProduct);
    } catch (e) {
      res.status(500).json({ ErrorMessage: e.message });
    }
  }

  async delete(req, res) {
    try {
      console.log(req.params.id)
      const product = await ProductsService.delete(req.params.id);
      return res.status(204).json(product);
    } catch (e) {
      res.status(500).json({ ErrorMessage: e.message });
    }
  }
}

export default new ProductsController();
