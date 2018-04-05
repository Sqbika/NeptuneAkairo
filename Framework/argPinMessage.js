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
        msg = await channel.fetchMessage(pinMessage.msgID);
    } catch (e) {
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
        msg = await client.channels.get(pinMessage.channel).send({
            embed: client.util.embed().setImage(`https://sqbika.win/atlas/pinmessages/${pinMessage.arg}.png?${Math.random()}`)
        });
    } else
        msg.edit({
            embed: client.util.embed().setImage(`https://sqbika.win/atlas/pinmessages/${pinMessage.arg}.png?${Math.random()}`)
        });
    pinMessage.msgID = msg.id;
    var guildID = client.channels.get(pinMessage.channel).guild.id;
    var a = client.settings.get(guildID, 'args')
    a[pinMessage.arg].pinMessage = pinMessage;
    client.settings.set(guildID, 'args', a);

    messages[messages.indexOf(messages.find(e => e.id == pinMessage.id))] = pinMessage;
}

var periodicUpdateLimitter = 0;

function periodicUpdate() {
    periodicUpdateLimitter++;
    if (periodicUpdateLimitter >= 720) {
        periodicUpdateLimitter = 0;
        messages.forEach(pinMessage => {
            drawImage(pinMessage);
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
        Object.keys(guild.args).forEach(args => {
            var arg = guild.args[args];
            if (typeof arg.pinMessage !== "undefined") {
                messages.push(arg.pinMessage);
                if (arg.pinMessage.id > maxID) maxID = arg.pinMessage.id + 1;
            }
        })
    });
}

function drawImage(pinMessage) {

    const canvas = createCanvas(380, 450);
    var ctx = canvas.getContext("2d");
    ctx.antialias = 'subpixel';

    var red = "#CF3E6E";
    var blue = "#53B4BD";
    var separator = "#738084";
    var normal = "#BFC0C1";

    var font = "Consolas";

    var title = "28px " + font;
    var subTitle = "14px " + font;
    var subText = "17px " + font;
    var sepFont = "bold 12px " + font;

    var bigSplit = ". - - .. - - .. - - .. - - .. - - .. - - .. -";
    var split = " .. - - .. - - .. - - .. - - ..";

    var width = canvas.width / 2;

    function cutDate(date) {
        return date.substr(0, date.length - 8);
    }

    // Positions;
    var posCounter = 1;
    var pos = (add = 10) => {
        return 25 * posCounter++ + add;
    }


    ctx.font = title;
    ctx.fillStyle = red;
    ctx.textAlign = "center";
    ctx.fillText(":: " + pinMessage.arg + " ::", width, pos());

    ctx.font = subTitle;
    ctx.fillStyle = blue;
    ctx.fillText("last pin refresh: " + cutDate(new Date().toString()), width, pos());

    ctx.fillStyle = separator;
    ctx.font = sepFont;
    ctx.fillText(bigSplit, width, pos());

    ctx.fillStyle = blue;
    ctx.font = subTitle;
    ctx.textAlign = "right";
    ctx.fillText("TIME OF LAST EVENT<", canvas.width, pos());

    ctx.fillStyle = normal;
    ctx.font = subText;
    ctx.fillText(cutDate(pinMessage.whatHappened.date.toString()), canvas.width, pos(4));

    ctx.textAlign = "start";
    ctx.fillStyle = red;
    ctx.font = subTitle;
    ctx.fillText(">WHAT HAPPENED", 0, pos(10));

    ctx.font = subText;
    ctx.fillStyle = normal;
    var text = pinMessage.whatHappened.text + " ";
    var textLength = ctx.measureText(text).width;
    var a = Math.ceil(textLength / canvas.width);
    for (var i = 1; i < a + 1; i++) {
        var ehh = true;
        var b = 50;
        var fill;
        var TEMPa = 0;
        do {
            TEMPa += 20;
            fill = text.slice(0, b);
            var fillWidth = ctx.measureText(fill).width + 25;
            if (fillWidth > canvas.width) {
                b--
            } else {
                ehh = false;
            }
        } while (ehh);
        if (i !== a-1)
        [0, -1].indexOf(fill.lastIndexOf(' ')) !== -1 ? b = b : b = fill.lastIndexOf(' ');
        fill = text.slice(0, b);
        text = text.slice(b, text.length);
        ctx.fillText(fill, 15, pos());
    }

    ctx.fillStyle = separator;
    ctx.textAlign = "center";
    ctx.font = sepFont;
    ctx.fillText(split, width, pos());

    ctx.fillStyle = blue;
    ctx.font = subTitle;
    ctx.textAlign = "right";
    ctx.fillText("SPECULATED TIME OF NEXT EVENT<", canvas.width, pos());

    ctx.fillStyle = normal;
    ctx.font = subText;
    ctx.fillText(cutDate(pinMessage.waitingFor.date.toString()), canvas.width, pos(4));

    ctx.textAlign = "start";
    ctx.fillStyle = red;
    ctx.font = subTitle;
    ctx.fillText(">WHAT WE ARE WAITING FOR", 0, pos(10));

    ctx.font = subText;
    ctx.fillStyle = normal;
    var text = pinMessage.waitingFor.text + " ";
    var textLength = ctx.measureText(text).width;
    var a = Math.ceil(textLength / canvas.width);
    for (var i = 1; i < a + 1; i++) {
        var ehh = true;
        var b = 50;
        var fill;
        var TEMPa = 0;
        do {
            TEMPa += 20;
            fill = text.slice(0, b);
            var fillWidth = ctx.measureText(fill).width + 25;
            if (fillWidth > canvas.width) {
                b--
            } else {
                ehh = false;
            }

        } while (ehh);
        if (i !== a-1)
        [0, -1].indexOf(fill.lastIndexOf(' ')) !== -1 ? b = b : b = fill.lastIndexOf(' ');
        fill = text.slice(0, b);
        text = text.slice(b, text.length);
        ctx.fillText(fill, 15, pos());
    }

    ctx.fillStyle = separator;
    ctx.textAlign = "center";
    ctx.font = sepFont;
    ctx.fillText(bigSplit, width, pos());
    ctx.font = "italic " + subTitle;
    ctx.textAlign = "center";
    ctx.fillText("Design by: @violace#8728 (307964708743413760)", width, pos());

    const canvas2 = createCanvas(380, pos());
    var ctx2 = canvas2.getContext("2d");
    ctx2.drawImage(canvas, 0, 0);

    fs.write('/var/www/html/atlas/pinmessages/' + pinMessage.arg + ".png", canvas2.toBuffer());
}


/* Old drawImage
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
    var a = Math.ceil(textLength / canvas.width);
    a > 5 ? a = 5 : a = a;
    var letter = ctx.measureText("M").width;
    for (var i = 1; i < a + 1; i++) {
        var ehh = true;
        var b = 50;
        var fill;
        do {
            fill = text.slice(0, b);
            var fillWidth = ctx.measureText(fill).width;
            if (fillWidth > canvas.width) {
                b--
            } else {
                ehh = false;
            }
        } while (ehh);

        text = text.slice(b, text.length);
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
    var a = Math.ceil(textLength / canvas.width);
    a > 5 ? a = 5 : a = a;
    var letter = ctx.measureText("M").width;
    for (var i = 1; i < a + 1; i++) {
        var ehh = true;
        var b = 50;
        var fill;
        do {
            fill = text.slice(0, b);
            var fillWidth = ctx.measureText(fill).width;
            if (fillWidth > canvas.width) {
                b--
            } else {
                ehh = false;
            }
        } while (ehh);
        var text = text.slice(b, text.length);
        ctx.fillText(fill, 1, waitingStart + (20 * i));
    }
    ctx.fillStyle = "#22cc55";
    ctx.fillText("Speculation:" + pinMessage.waitingFor.date, 1, 290);

    fs.write('/var/www/html/atlas/pinmessages/' + pinMessage.arg + ".png", canvas.toBuffer());
} */

module.exports = {
    setup,
    fetchMessage,
    updateMessage,
    periodicUpdate,
    loadMessages,
    drawImage,
    addMessage,
    client,
    messages
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