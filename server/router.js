const express = require('express');
const expressWs = require('express-ws');
const moment = require('moment');
const random = require('./random');

const router = express.Router();
expressWs(router);

router.ws('/wst', (ws, req) => {
    const sendData = setInterval(() => {
        let date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        console.log(`推送时间: ${date}`);
        let data = {
            box: getBoxData()
        }
        ws.send(JSON.stringify(data));
    }, 3000);
    ws.on('message', (msg) => {
        ws.send(msg);
    });

    ws.on('open', () => {
        console.log('websocket连接成功！')
    })

    ws.on('close', () => {
        clearInterval(sendData)
        console.log('连接关闭');
    })
});

const getBoxData = () => {
    return {
        x: random(-10, 10),
        y: random(-10, 10),
        z: random(-10, 10),
        rx: random(1, 5),
        ry: random(1, 5),
        rz: random(1, 5),
        speed: random(2, 5),
    }
}

module.exports = router;
