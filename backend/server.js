const app = require('./src/app.js');
const crypto = require('node:crypto')
const cron = require('node-cron');
const axios = require('axios');


let currentToken = null;
let triggerToken = null;
let windowOpen = false;

cron.schedule('30 8 * * *', () => {
    currentToken = crypto.randomBytes(16).toString('hex'); // naya secure random token roz
    windowOpen = true;
    console.log('Checkin token:', currentToken);
});

cron.schedule('30 9 * * *', () => {
    if (windowOpen) {
        // matlab button press nahi hua, trigger karo
        triggerToken = crypto.randomBytes(16).toString('hex');
        sendEmail(); // tera nodemailer wala function
    }
    windowOpen = false;
    currentToken = null;
});

app.get('/checkin/:token', (req, res) => {
    if (req.params.token === currentToken && windowOpen) {
        windowOpen = false; // "button pressed" — window band
        currentToken = null;
        return res.redirect('/');
    }
    res.status(404).send('Not found');
});

app.listen(3001, () => {
  console.log("DMS is listning at port 3001")
})