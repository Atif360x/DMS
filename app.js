const express = require('express');
const app = express();
const prompt = require('prompt-sync')();
require('dotenv').config();
const nodemailer = require('nodemailer');

const DMS = () => {
    const check = prompt('bro you there? ');

    if (check !== null && check.trim() !== "") {
        console.log('alr gng');
    } else {
        setTimeout(() => {
            const passWord = process.env.PASS;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'mansuriatif78@gmail.com',
                    pass: passWord,
                }
            });

            const mailOptions = {
                from: 'mansuriatif78@gmail.com',
                to: 'mansuriatif80@gmail.com',
                subject: 'TS IS FUCKING URGENT',
                text: 'BRO YOUR BOYFRIEND IS DEAD HE HAS NOT RESPONCE TO DEAD MANS SWITCH HE SET, CHECK ON HIM ASAP',
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log('Error occurred:', error);
                }
                console.log('Email sent successfully!', info.messageId);
            });
        }, 60000);
    }
};

function scheduleDMS() {
    const now = new Date();
    const target = new Date();
    target.setHours(8, 30, 0, 0);

    if (target <= now) {
        target.setDate(target.getDate() + 1);
    }

    const delay = target - now;

    setTimeout(() => {
        DMS();
        setInterval(DMS, 24 * 60 * 60 * 1000);
    }, delay);
}

scheduleDMS();

app.listen(3000, () => {
    console.log("server is listning at port 3000");
});