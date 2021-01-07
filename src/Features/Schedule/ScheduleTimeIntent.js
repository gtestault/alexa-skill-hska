const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils.js")

const ScheduleTimeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleTimeIntent';
    },
    async handle(handlerInput) {
        let courseId
        let groupId = 0
        let semesterId
        let lectureId

        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots

        let responseSpeach = ""

        try {
            if (utils.isSlotTypeValid(slotValues.course)) {

                courseId = slotValues.course.resolutions.resolutionsPerAuthority[0].values[0].value.id
                semesterId = slotValues.semester.resolutions.resolutionsPerAuthority[0].values[0].value.id
                if (slotValues.groups.resolutions !== undefined) {
                    groupId = slotValues.groups.resolutions.resolutionsPerAuthority[0].values[0].value.id
                }
                lectureId = slotValues.lecture.resolutions.resolutionsPerAuthority[0].values[0].value.name

                responseSpeach = await getScheduleInfo(courseId, semesterId, groupId, lectureId);

                console.log("Studiengang: " + courseId + " Semester: " + semesterId + " Gruppe: " + groupId + " Vorlesung: " + lectureId);
            } else {
                responseSpeach = "Der Studiengang konnte nicht gefunden werden. Bitte wiederholen Sie Ihre Anfrage.";
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


const getScheduleInfo = (courseId, semesterId, groupsId, lectureId) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/timetable/${courseId}/${groupsId}/${semesterId}`;
        //let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/timetable/all`;

        console.log(requestURI)
        const req = https.get(requestURI, function (res) {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', () => {
                if (res.statusCode == 200) {
                    body = JSON.parse(Buffer.concat(body).toString());
                    console.log(`~~~~ Data received: ${JSON.stringify(body)}`);

                    let i = 0
                    let n = 0
                    let day = ''
                    let start = ''
                    let found = 0
                    let block = 0
                    console.log("gesucht: " + lectureId)

                    const today = new Date()
                    let nextDate = new Date()
                    nextDate.setFullYear(nextDate.getFullYear()+1)

                    while (n < 7) {
                        if (body.timetables[n].entries[i] === undefined) {
                            n++
                            i = 0
                        } else {
                            if (lectureId == body.timetables[n].entries[i].lectureName) {
                                if (body.timetables[n].entries[i].interval == "WEEKLY") {
                                    start = utils.convertValueToHour(body.timetables[n].entries[i].startTime)
                                    day = utils.convertValueToDay(body.timetables[n].entries[i].day)
                                    if (found > 0) {
                                        responseSpeach = responseSpeach + ", und "
                                    }
                                    found = found + 1
                                    responseSpeach = responseSpeach + day + " um " + start
                                } else if (body.timetables[n].entries[i].interval == "BLOCK") {
                                    start = utils.convertValueToHour(body.timetables[n].entries[i].startTime)
                                    const date = new Date(body.timetables[n].entries[i].firstDate)
                                    date.setHours(body.timetables[n].entries[i].startTime / 60, body.timetables[n].entries[i].startTime % 60 )
                                    if (today < date && date < nextDate) {
                                        nextDate = date
                                        block = 1
                                        //found = 1
                                        responseSpeach = "Die Blockveranstaltung " + lectureId + " findet das nächste Mal am " + nextDate.getDate() + "." + (nextDate.getMonth() + 1) + ". um " + start + " statt"
                                    }
                                }
                            }
                            i++
                        }
                    }
                    if (block == 0) {
                        responseSpeach = "Die Vorlesung " + lectureId + " findet am " + responseSpeach + " statt"
                        if (found == 0) {
                            responseSpeach = "Die Vorlesung " + lectureId + " findet dieses Semester nicht mehr statt"
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

module.exports = ScheduleTimeIntentHandler

