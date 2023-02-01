const Tags = require('../Models/tagsmodel')


exports.addTag = async (req, res, next) => {
    try {
        // const tag = new Tags({
        //     name: req.body.name,
        //     description: req.body.description,   
        // })
        await Tags.create(req.body)   
        res.send({message: "Tag created successfully."})
    } catch (error) {
        next();
    }
};
exports.getAllTags = async (req, res, next) => {
    try {
        let tags = await Tags.find()
        res.send(tags);
    } catch (error) {
        next();
    }
};

exports.getOneTag = async (req, res, next) => {
    try {
        let tag = await Tags.findById(req.params.id)
        res.send(tag);
    } catch (error) {
        next();
    }
};

exports.updateTag = async (req, res, next) => {
    try {
         await Tags.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send({message: "Tag has been updated successfully."})
    }
    catch (error) {
        next();
    }
};

exports.deleteTag = async (req, res, next) => {
    try {
         await Tags.findByIdAndRemove(req.params.id);
        res.send({message: "Tag has been delated successfully."});
    } catch (error) {
        next()
    }
};
