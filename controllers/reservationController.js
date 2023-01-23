const Reservation = require('../Models/reservationModel');
const Event = require('../Models/eventmodel')
const nodemailer = require('nodemailer');
const fs = require('fs')
const ejs = require('ejs')



exports.addReservation = async (req, res, next) => {
    try {
        // var event = await Event.findById(req.body.eventId)
        // if (event) {
            const reservation = new Reservation({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                event: req.body.eventId
            })
            console.log(reservation);

            // send mail
            const html = fs.readFileSync("templates/reservation.html", "utf8");
            const render = ejs.render(html, {firstName:'Karim'})
            let transporter = nodemailer.createTransport({
                service: process.env.SERVICE,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS,
                },
            });
  
            let info = await transporter.sendMail({
                from: process.env.USER,
                to: `${reservation.Email}`,
                subject: "Reservation",
                html: render,
            });
            await reservation.save()
            res.send({ message: "Reservation successfully." })
        // }
           } catch (error) {
        console.log(error);
        next();
    }
};