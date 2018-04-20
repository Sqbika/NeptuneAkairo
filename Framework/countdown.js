module.exports = {};

var countdowns = [];

function addCountdown(msg, date, text) {
   var db = getDB(msg);
    var ctObject = {
        ID: db.ID++,
        countdownTo: date,
        unit: 60000,
        text: text,
        notify: []
    };
    countdowns.push(ctObject);
    db.countdowns.push(ctObject);
    msg.client.settings.set(msg.guild.id, 'countdowns', ctObject);
}

function removeCountdown(msg, date, ID) {
    var db = getDB(msg);
    countdowns.find((e) => e.ID == id);
    countdowns.splice(countdowns.indexOf(countdowns.find((e) => e.ID == ID)), 1);
    db.countdowns.splice(db.countdowns.indexOf(db.countdowns.find((e) => e.ID == ID)), 1);
}



function getDB(msg) {
    var db = msg.client.settings.get(msg.guild.id, 'countdowns', "empty");
    if (db == empty) db = {
        ID: 0,
        countdowns: []
    }
}

/*
{
    countdownTo: new Date(),
    unit: 60000,
    text: "",
    notify: [],
}
*/