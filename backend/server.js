const express = require('express');
const app = express();
const crypto = require('crypto');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const path = require('path');

const TIMEZONE = 'Asia/Kolkata';



let activeToken = null;
let switchTimer = null;

const triggerDeadManSwitch = () => {
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
        subject: 'URGENT: Dead Man\'s Switch Triggered',
        text: 'NO RESPONSE TO DEAD MAN\'S SWITCH. CHECK ON HIM ASAP.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Emergency email sent successfully:', info.messageId);
    });
};


cron.schedule('50 11 * * *', () => {
    activeToken = crypto.randomBytes(16).toString('hex');
    console.log(`[CRON] New check-in token generated: ${activeToken}`);


    if (switchTimer) clearTimeout(switchTimer);

    switchTimer = setTimeout(() => {
        console.log('Check-in window missed! Triggering emergency protocol...');
        triggerDeadManSwitch();
    }, 24 * 60 * 60 * 1000);
}, {
    timezone: TIMEZONE
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({ active: !!activeToken });
});


app.get('/checkin', (req, res) => {
    const { token } = req.params;

    if (token === activeToken) {
        if (switchTimer) {
            clearTimeout(switchTimer);
            switchTimer = null;
        }
        activeToken = null;
        return res.send('Check-in successful. Dead Man\'s Switch disarmed for today.');
    }

    res.status(400).send('Invalid or expired check-in token.');
});

app.listen(3001, () => {
    console.log('Server running on port 3001 with LiveReload enabled');
});