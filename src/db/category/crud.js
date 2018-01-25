const Category = require('./../../models/category')

exports.get = async() => {
    const res = await Category
        .find({
            enable: true
        }, 'name description slug enable created', {sort: {name: 1}})
    return res
}

exports.getBySlug = async(slug) => {
    const res = await Category
        .findOne({
            slug: slug,
            enable: true
        }, 'name description slug enable created')
    return res
}

exports.getById = async(id) => {
    const res = await Category
        .findById(id, 'id name description enable created')
    return res
}

exports.create = async(data) => {
    const category = new Category(data)
    const res = await category.save()
    return res
}

exports.update = async(id, data) => {
    const res = await Category
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                description: data.description,
                slug: data.slug
            }
        })

    return res
}

exports.delete = async(id) => {
    await Category
        .findOneAndRemove(id)
}