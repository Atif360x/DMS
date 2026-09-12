const app = require('./src/app.js');``
const crypto = require('node:crypto')

/**
 * checkoutScheduler.js
 * -----------------------------------------------------------
 * Runs forever. Every day:
 *   - at 08:30 -> hits /startCheckOutTime
 *   - at 09:30 -> hits /endCheckOutTime
 *
 * Uses node-cron for scheduling (handles "repeat every day
 * without stopping" natively) and axios to call your routes.
 *
 * Install deps first:
 *   npm install node-cron axios express
 * -----------------------------------------------------------
 */

const cron = require('node-cron');
const axios = require('axios');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;


app.get('/startCheckOutTime', (req, res) => {
  console.log(`[${new Date().toLocaleString()}] ✅ startCheckOutTime hit`);
  // put your real logic here (DB update, notification, etc.)
  res.send('Check-out window started');
});

app.get('/endCheckOutTime', (req, res) => {
  console.log(`[${new Date().toLocaleString()}] 🛑 endCheckOutTime hit`);
  // put your real logic here
  res.send('Check-out window ended');
});

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
});

// ---- Helper to call a route ----
async function hitRoute(path) {
  try {
    const res = await axios.get(`${BASE_URL}${path}`);
    console.log(`Called ${path} -> ${res.status}`);
  } catch (err) {
    console.error(`Failed to call ${path}:`, err.message);
  }
}


cron.schedule('30 8 * * *', () => {
    let num = Math.random()*739
    const startCheckin = crypto.createHash('sha256', home).update("ugh man").digest("hex")
    console.log(startCheckin)

    app.get(`/${startCheckin}`, (req, res) => {
        
    })

});

cron.schedule('30 9 * * *', () => {
  let num = Math.random()*739
    const endCheckin = crypto.createHash('sha256', home).update("ugh man").digest("hex")
    console.log(endCheckin)

    app.get(`/${endCheckin}`, (req, res) => {
        
    })
});


app.listen(3001,
    console.log("DMS IS LISTNING AT PORT 3000")
)