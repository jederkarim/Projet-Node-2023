const Event = require('../Models/eventmodel')



exports.addEvent = async (req, res, next) => {

    try {
        
            const event = new Event({
            eventName: req.body.eventName,
            eventDescription: req.body.eventDescription,
            typeEvent: req.body.typeEvent,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            locationEvent: req.body.locationEvent,
            price: req.body.price,
            picture: req.body.picture

        })
        await event.save()


        res.send({ message: "Event created successfully." })

    } catch (error) {
        console.log(error);
        next();

    }

};

exports.getAllEvents = async (req, res, next) => {
    try {
        let event = await Event.find()
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

