const {
    createCanvas,
    loadImage
} = require('canvas');
const fs = require('fs-jetpack');

let messages = [];
let client;
let maxID = 0;

function setup(Client) {
    client = Client;
}

async function fetchMessage(pinMessage) {
    var channel = client.channels.get(pinMessage.channel);
    var msg;
    try {
        console.log(pinMessage);
        msg = await channel.fetchMessage(pinMessage.msgID);
    } catch (e) {
        console.log(e);
        msg = undefined;
    }
    return msg;
}

function addMessage(pinMessage) {
    pinMessage.id = maxID++;
    messages.push(pinMessage);
    updateMessage(pinMessage);
}

async function updateMessage(pinMessage) {
    drawImage(pinMessage);
    var msg = await fetchMessage(pinMessage);

    if (msg == undefined) {
        msg = client.channels.get(pinMessage.channel).send({
            embed: client.util.embed().setImage(`https://sqbika.win/atlas/pinmessages/${pinMessage.arg}.png?${Math.random()}`)
        });
        pinMessage.msgID = msg.id;
    }
    else
        msg.edit({
            embed: client.util.embed().setImage(`https://sqbika.win/atlas/pinmessages/${pinMessage.arg}.png?${Math.random()}`)
        });
    pinMessage.msgID = msg.id;
    var guildID = client.channels.get(pinMessage.channel).guild.id;
    console.log(guildID);
    var a = client.settings.get(guildID, 'args')
    a[pinMessage.arg].pinMessage = pinMessage;
    client.settings.set(guildID, 'args', a);

    messages[messages.indexOf(messages.find(e => e.id == pinMessage.id))] = pinMessage;
}

var periodicUpdateLimitter = 0;

function periodicUpdate() {
    periodicUpdateLimitter++;
    if (periodicUpdateLimitter >= 12) {
        periodicUpdateLimitter = 0;
        messages.forEach(pinMessage => {
            drawImage(pinMessage);
            console.log(pinMessage);
            var message = fetchMessage(pinMessage).then(message => {
                message.edit({
                    embed: client.util.embed().setImage(`https://sqbika.win/atlas/pinmessages/${pinMessage.arg}.png?${Math.random()}`)
                });
            });
        })
    }
}

function loadMessages() {
    client.settings.items.forEach(guild => {
        guild.args.forEach(args => {
            if (typeof args.pinMessage !== "undefined") {
                messages.push(args.pinMessage);
                if (args.pinMessage.id > maxID) maxID = args.pinMessage.id + 1;
            }
        })
    });
}



function drawImage(pinMessage) {
    const canvas = createCanvas(350, 300);
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#36393e";
    ctx.fillRect(0, 0, 500, 300);

    ctx.fillStyle = "#ffffff";

    ctx.font = "13.25px Open Sans";
    ctx.fillText("Update:" + new Date().toString(), ctx.measureText(pinMessage.arg).width + 8, ctx.measureText("M").width);
    ctx.fillText(pinMessage.arg, 1, ctx.measureText("M").width);
    canvas.width = ctx.measureText(pinMessage.arg) + ctx.measureText("Update:" + new Date().toString()) + 8;

    ctx.strokeStyle = "#ccffcc";
    ctx.fillStyle = "#ff0077";
    ctx.strokeRect(-1, -1, ctx.measureText(pinMessage.arg).width + 5, ctx.measureText("M").width + 5);
    ctx.strokeRect(ctx.measureText(pinMessage.arg).width + 4, -1, 500, ctx.measureText("M").width + 5);

    var lineHeight = (300 - ctx.measureText("M").width + 5) / 2;

    ctx.beginPath();
    ctx.moveTo(0, (300 - ctx.measureText("M").width + 5) / 2);
    ctx.lineTo(500, (300 - ctx.measureText("M").width + 5) / 2);
    ctx.stroke();

    ctx.font = "20px Open Sans";
    var whatHappenedStartin = ctx.measureText("M").width * 2;


    ctx.fillText("What Happened:", 1, whatHappenedStartin);
    ctx.fillStyle = "#cccccc";
    ctx.font = "15px Open Sans";
    var text = pinMessage.whatHappened.text;
    var textLength = ctx.measureText(text).width;
    var done = false;
    var a = Math.floor(textLength / canvas.width);
    a > 5 ? a = 5 : a = a;
    var letter = ctx.measureText("M").width;
    for (var i = 1; i < a + 1; i++) {
        var ehh = true;
        var b = 30;
        var fill;
        do {
            fill = text.slice(0, b);
            var fillWidth = ctx.measureText(fill).width;
            if (fillWidth > canvas.width) {
                b--
            } else if (fillWidth + letter < canvas.width) {
                b++;
            } else {
                ehh = true;
            }
        } while (ehh);
        var text = text.slice(b, text.length);
        ctx.fillText(fill, 1, whatHappenedStartin + (20 * i));
    }

    ctx.fillStyle = "#22cc55";
    ctx.fillText("When:" + pinMessage.whatHappened.date, 1, lineHeight - 5);

    ctx.font = "20px Open Sans";
    var waitingStart = lineHeight + ctx.measureText("M").width + 5;
    ctx.fillStyle = "#ff0077";
    ctx.fillText("What are we waiting for:", 1, lineHeight + ctx.measureText("M").width + 5);
    ctx.fillStyle = "#cccccc";
    ctx.font = "15px Open Sans";

    var text = pinMessage.waitingFor.text;
    var textLength = ctx.measureText(text).width;
    var done = false;
    var a = Math.floor(textLength / canvas.width);
    a > 5 ? a = 5 : a = a;
    var letter = ctx.measureText("M").width;
    for (var i = 1; i < a + 1; i++) {
        var ehh = true;
        var b = 30;
        var fill;
        do {
            fill = text.slice(0, b);
            var fillWidth = ctx.measureText(fill).width;
            if (fillWidth > canvas.width) {
                b--
            } else if (fillWidth + letter < canvas.width) {
                b++;
            } else {
                ehh = true;
            }
        } while (ehh);
        var text = text.slice(b, text.length);
        ctx.fillText(fill, 1, waitingStart + (20 * i));
    }
    ctx.fillStyle = "#22cc55";
    ctx.fillText("Speculation:" + pinMessage.waitingFor.date, 1, 290);

    fs.write('/var/www/html/atlas/pinmessages/' + pinMessage.arg + ".png", canvas.toBuffer());
}

module.exports = {
    setup,
    fetchMessage,
    updateMessage,
    periodicUpdate,
    loadMessages,
    drawImage,
    addMessage,
    client
};

/*
{
    id: 0
    arg: "wakingtitan";
    msgID: 1234566,
    channel: 1234567,
    whatHappened: {
        text: "bla",
        date: new Date();
    },
    waitingFor: {
        text: "Bla",
        date: new Date();
    }
}
*/