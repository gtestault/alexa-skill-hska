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
        let lectureId

        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots

        let responseSpeach = ""

        try {
            if (utils.isSlotTypeValid(slotValues.course) && utils.isSlotTypeValid(slotValues.lecture)) {

                courseId = slotValues.course.resolutions.resolutionsPerAuthority[0].values[0].value.id
                if (slotValues.groups.resolutions !== undefined) {
                    groupId = slotValues.groups.resolutions.resolutionsPerAuthority[0].values[0].value.id
                }
                lectureId = slotValues.lecture.resolutions.resolutionsPerAuthority[0].values[0].value.name

                responseSpeach = await getScheduleInfo(courseId, groupId, lectureId);

                console.log("Studiengang: " + courseId + " Gruppe: " + groupId + " Vorlesung: " + lectureId);
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
            .reprompt()
            .getResponse();
    }
};


const getScheduleInfo = (courseId, groupsId, lectureId) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/timetable/all`;
        //console.log(requestURI)
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
                    let m
                    let o
                    let day = ''
                    let start = ''
                    let found = 0
                    let block = 0
                    //console.log("gesucht: " + lectureId)

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

                    const today = new Date()
                    let nextDate = new Date()
                    nextDate.setFullYear(nextDate.getFullYear()+1)

                    while (m < o) {
                        while (n < 7) {
                            if (body[m].timetables[n].entries[i] === undefined) {
                                n++
                                i = 0
                            } else {
                                if (lectureId == body[m].timetables[n].entries[i].lectureName) {
                                    if (body[m].timetables[n].entries[i].interval == "WEEKLY") {

                                        start = utils.convertValueToHour(body[m].timetables[n].entries[i].startTime)
                                        day = utils.convertValueToDay(body[m].timetables[n].entries[i].day)

                                        if (groupsId == 0 || (body[m].timetables[n].entries[i].group == "" || body[m].timetables[n].entries[i].group == groupsId)){
                                            if (found > 0) {
                                                responseSpeach = responseSpeach + ", und "
                                            }
                                            found = found + 1
                                            responseSpeach = responseSpeach + day + " um " + start
                                        }

                                    } else if (body[m].timetables[n].entries[i].interval == "BLOCK") {
                                        start = utils.convertValueToHour(body[m].timetables[n].entries[i].startTime)
                                        const date = new Date(body[m].timetables[n].entries[i].firstDate)
                                        date.setHours(body[m].timetables[n].entries[i].startTime / 60, body[m].timetables[n].entries[i].startTime % 60)
                                        if (today < date && date < nextDate) {
                                            nextDate = date
                                            block = 1
                                            responseSpeach = "Die Blockveranstaltung " + lectureId + " findet das nächste Mal am " + nextDate.getDate() + "." + (nextDate.getMonth() + 1) + ". um " + start + " statt"
                                        }
                                    }
                                }
                                i++
                            }
                        }
                        m++
                        n = 0
                        i = 0
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

