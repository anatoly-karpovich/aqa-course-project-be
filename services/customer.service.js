import Customer from "../models/customer.model.js"

class CustomerService {
    async create(customer) {
            const existingCustomer = await Customer.findOne({email: customer.email})
            if(existingCustomer) {
                throw new Error(`Customer with email '${customer.email}' already exists`)
            }
            const createdCustomer = await Customer.create(customer)
            // return createdProduct
            return   {Customer: {...createdCustomer._doc}, IsSuccess: true, ErrorMessage: null}
        }
    

    async getAll() {
            const customer = await Customer.find()
            return customer

    }

    async getCustomer(id) {
        if(!id) {
            throw new Error('Id was not provided')
        }
        const customer = await Customer.findById(id)
        return customer;
    }

    async update(customer) {
            if(!customer._id) {
                throw new Error('Id was not provided') 
            }
            const updatedCustomer = await Customer.findByIdAndUpdate(customer._id, customer, {new: true})
            return updatedCustomer
    }

    async partiallyUpdate(customer) {
        if(!customer._id) {
            throw new Error( 'Id was not provided') 
        }
        const updatedCustomer = await Customer.findByIdAndUpdate(customer._id, customer, {new: true})
        return updatedCustomer
}
    
    async delete(id) {
        if(!id) {
            throw new Error('Id was not provided')
        }
            const customer = await Customer.findByIdAndDelete(id)
            return customer
    }
}

export default new CustomerService()