const Event = require('../Models/eventmodel')

exports.addEvent = async (req, res, next) => {
    try {
     
        await Event.create(req.body)   
        res.send({message: "Event created successfully."})
    } catch (error) {
        next();
    }
};

exports.getAllEvents = async (req, res, next) => {
    try {
        let event = await Event.find().populate('tags')
        res.send(event);
    } catch (error) {
        next();
    }
};


exports.getOneEvent = async (req, res, next) => {
    try {
        let event = await Event.findById(req.params.id)
        res.send(event);

    } catch (error) {
        next();
    }
};

exports.updateEvent = async (req, res, next) => {
    try {
        let event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send({ message: "Event has been updated successfully." })
    }
    catch (error) {
        next();
    }
};

exports.deleteEvent = async (req, res, next) => {
    try {
        let event = await Event.findByIdAndRemove(req.params.id);
        res.send({ message: "Event has been delated successfully." });
    } catch (error) {
        next()
    }
};

