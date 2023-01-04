import Product from "../models/Product.model.js"

class ProductsService {
    async create(product) {
            const existingProduct = await Product.findOne({name: product.name})
            if(existingProduct) {
                throw new Error(`Product with name '${product.name}' already exists`)
            }
            const createdProduct = await Product.create(product)
            // return createdProduct
            return   {Product: {...createdProduct._doc}, IsSuccess: true, ErrorMessage: null}
        }
    

    async getAll() {
            const products = await Product.find()
            return products

    }

    async getProduct(id) {
        if(!id) {
            throw new Error('Id was not provided')
        }
        const product = await Product.findById(id)
        return product;
    }

    async update(product) {
            if(!product._id) {
                throw new Error( 'Id was not provided') 
            } 
            const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true})
            return updatedProduct
    }

    async partiallyUpdate(product) {
        if(!product._id) {
            throw new Error( 'Id was not provided') 
        }
        const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true})
        return updatedProduct
}
    
    async delete(id) {
        if(!id) {
            throw new Error('Id was not provided')
        }
            const product = await Product.findByIdAndDelete(id)
            return product
    }
}

export default new ProductsService()