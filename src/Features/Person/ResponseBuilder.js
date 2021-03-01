const utils = require("../../Default/utils/Utils.js")

let hasMissingInformation

let responseSpeech;

module.exports = {
    getResponseSpeech(body) {
    hasMissingInformation = 0;
    responseSpeech = "";
    let day = utils.convertValueToDay(body[0].consultationDay);
    let start = utils.convertValueToHour(body[0].consultationStartTime);
    let end = utils.convertValueToHour(body[0].consultationEndTime);
    let room = body[0].building + body[0].room;
    let comment = body[0].consultationTimeComment;
    console.log("tag: " + day + " start: " + start + " ende: " + end);
    buildResponseSpeech(day, start, end, room, comment);
    checkResponse();
    return responseSpeech;
    }
}

const buildResponseSpeech = (day, start, end, room, comment) => {
    responseSpeech = "Die Sprechstunde ist";
    let hasMissingInformation = 0;
    buildDay(day);
    buildHour(start, end);
    buildRoom(room);
    buildComment(comment);
}

const buildDay = (day) => {
    if (day == -1
    ) {
        hasMissingInformation--;
    } else {
        responseSpeech = responseSpeech + " am " + day;
    }
}

const buildHour = (start, end) => {
    if (start.includes("-1") || start == "" || end.includes("-1")  || end == "") {
        hasMissingInformation--;
    } else {
        responseSpeech = responseSpeech + " von " + start + " bis " + end;
    }
}

const buildRoom = (room) => {
    if (room.includes("-1")  || room == "" ) {
        hasMissingInformation--;
    } else {
        responseSpeech = responseSpeech + " in Raum " + room;
    }
}

const buildComment = (comment) => {
    if (hasMissingInformation == -3) {
        responseSpeech = responseSpeech + " bisher unbekannt. Bitte informieren Sie sich im Ilias oder kontaktieren Sie den Dozenten/die Dozentin.";
    }
    if (comment.length > 3) {
        responseSpeech = responseSpeech + ". Anmerkungen zu den Sprechstunden: " + comment + ".";
    }
}

const checkResponse = () => {
    if (responseSpeech.length === 0) {
        throw "test";
    }
}
