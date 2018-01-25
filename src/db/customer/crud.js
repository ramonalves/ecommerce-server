const Customer = require('./../../models/customer')

exports.get = async() => {
    const res = await Customer
        .find({}, null, {sort: {name: 1}})
    return res
}

exports.getBySlug = async(slug) => {
    const res = await Customer
        .findOne({
            slug: slug
        })
    return res
}

exports.getById = async(id) => {
    const res = await Customer
        .findById( id)
    return res
}

exports.create = async(data) => {
    let customer = new Customer(data)
    const res = await customer.save()
    return res
}

exports.update = async(id, data) => {
    const res = await Customer
        .findByIdAndUpdate(id, {
            $set: {
               data
            }
        })
        
    return res
}

exports.delete = async(id) => {
    await Customer
        .findOneAndRemove(id)
}