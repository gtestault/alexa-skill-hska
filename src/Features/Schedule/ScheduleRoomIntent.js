const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils.js")

const ScheduleRoomIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleRoomIntent';
    },
    async handle(handlerInput) {
        let courseId
        let groupId = 0
        let lectureId
        let dateId

        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots

        let responseSpeach = ""

        try {
            if (utils.isSlotTypeValid(slotValues.course) && utils.isSlotTypeValid(slotValues.lecture)
                && utils.isSlotTypeValid(slotValues.date)) {

                courseId = slotValues.course.resolutions.resolutionsPerAuthority[0].values[0].value.id
                if (slotValues.groups.resolutions !== undefined) {
                    groupId = slotValues.groups.resolutions.resolutionsPerAuthority[0].values[0].value.id
                }
                lectureId = slotValues.lecture.resolutions.resolutionsPerAuthority[0].values[0].value.name
                dateId =  slotValues.date.resolutions.resolutionsPerAuthority[0].values[0].value.id

                responseSpeach = await getScheduleInfo(courseId, groupId, lectureId, dateId);

                console.log(courseId + " (Gruppe " + groupId + ") " + lectureId + ", " + dateId);
            } else {
                responseSpeach = "Der Studiengang oder die Vorlesung konnten nicht gefunden werden. Bitte wiederholen Sie Ihre Anfrage.";
                //throw error maybe?
            }

        } catch (e) {
            console.log(`~~~~ No matching: ${e}`);
        }

        console.log(`TEXT TO SPEAK: ${responseSpeach}`);
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const getScheduleInfo = (courseId, groupsId, lectureId, date) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/timetable/all`;
        console.log(requestURI)
        const req = https.get(requestURI, function (res) {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', () => {
                if (res.statusCode == 200) {
                    body = JSON.parse(Buffer.concat(body).toString());
                    //console.log(`~~~~ Data received: ${JSON.stringify(body)}`);

                    let m
                    let o
                    let i = 0
                    let start = ''
                    let room = ''
                    let building = ''
                    let found = 0
                    let noRoom = false

                    console.log("gesucht: " + lectureId)

                    const today = new Date()
                    if (date == 7) {            // heute
                        date = (today.getDay() + 6) % 7
                    } else if (date == 8) {     // morgen
                        date = (today.getDay() + 7) % 7
                    } else if (date == 9) {     // übermorgen
                        date = (today.getDay() + 8) % 7
                    }

                    let nextDate = new Date()
                    nextDate.setDate(nextDate.getDate()+7) // + 1 Woche

                    if (courseId == "INFB") {
                        m = 0
                        o = 7
                    }
                    else if (courseId == "INFM") {
                        m = 7
                        o =10
                    }
                    else if (courseId == "MINB") {
                        m = 10
                        o = 17
                    }
                    else if (courseId == "MKIB") {
                        m = 17
                        o = 24
                    }

                    while (m < o) {
                        while (body[m].timetables[date].entries[i] !== undefined) {
                            if (lectureId == body[m].timetables[date].entries[i].lectureName) {

                                const firstDate = new Date(body[m].timetables[date].entries[i].firstDate)
                                firstDate.setHours(body[m].timetables[date].entries[i].startTime / 60, body[m].timetables[date].entries[i].startTime % 60 )

                                if (!(body[m].timetables[date].entries[i].interval == "BLOCK" && (firstDate < today || nextDate < firstDate))) {
                                    start = utils.convertValueToHour(body[m].timetables[date].entries[i].startTime)
                                    if (body[m].timetables[date].entries[i].locations[0] != undefined) {
                                        room = body[m].timetables[date].entries[i].locations[0].room
                                        building = body[m].timetables[date].entries[i].locations[0].building
                                    } else {
                                        noRoom = true
                                    }
                                    if (groupsId == 0 || (body[m].timetables[date].entries[i].group == "" || body[m].timetables[date].entries[i].group == groupsId)){
                                        if (found > 0) {
                                            responseSpeach = responseSpeach + ", und "
                                        }
                                        found = found + 1
                                        responseSpeach = responseSpeach + " um " + start + " in " + building + room
                                    }
                                }
                            }
                            i++
                        }
                        m++
                        i = 0
                    }

                    if(found == 0) {
                        responseSpeach = "Am " + utils.convertValueToDay(date) + " findet " + lectureId + " nicht statt."
                    } else {
                        if (noRoom == false) {
                            responseSpeach = "Die Vorlesung " + lectureId + " findet am " + utils.convertValueToDay(date) + responseSpeach + " statt"
                        } else {
                            responseSpeach = "Für die Vorlesung " + lectureId + " liegen keine Informationen vor"
                        }
                    }

                } else {
                    responseSpeach = "Die Vorlesung konnte nicht gefunden werden oder der Eintrag ist nicht in der Datenbank. Bitte wiederholen Sie Ihre Anfrage.";
                }
                resolve(responseSpeach)
            });
            res.on('error', (err) => {
                throw err
            });
        });
        req.end()
    })
}

module.exports = ScheduleRoomIntentHandler

