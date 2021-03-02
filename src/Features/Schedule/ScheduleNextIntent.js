const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils.js")

const ScheduleNextIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleNextIntent';
    },
    async handle(handlerInput) {
        let courseId
        let groupId = 0
        let semesterId
        let questionId

        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots

        let responseSpeach = ""

        try {
            if (utils.isSlotTypeValid(slotValues.course) && utils.isSlotTypeValid(slotValues.semester)
            && utils.isSlotTypeValid(slotValues.wFrage)) {

                courseId = slotValues.course.resolutions.resolutionsPerAuthority[0].values[0].value.id
                semesterId = slotValues.semester.resolutions.resolutionsPerAuthority[0].values[0].value.id
                if (slotValues.groups.resolutions !== undefined) {
                    groupId = slotValues.groups.resolutions.resolutionsPerAuthority[0].values[0].value.id
                }
                questionId = slotValues.wFrage.resolutions.resolutionsPerAuthority[0].values[0].value.id

                responseSpeach = await getScheduleInfo(courseId, semesterId, groupId, questionId);

                console.log(courseId + " " + semesterId + ". Semester (Gruppe " + groupId + ") " + questionId);
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
            .reprompt()
            .getResponse();
    }
};


const getScheduleInfo = (courseId, semesterId, groupsId, questionId) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/timetable/${courseId}/${groupsId}/${semesterId}`;
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

                    let i
                    let n = 0
                    let found = false
                    const today = new Date()
                    const date = (today.getDay() + 6) % 7
                    const time = today.getHours() * 60 + today.getMinutes()
                    let day

                    while (n<8 && found == false) {
                        day = (date + n) % 7
                        i=0
                        while (body.timetables[day].entries[i] !== undefined && found == false) {
                            if (n == 0) {
                                if (time > body.timetables[day].entries[i].startTime || body.timetables[day].entries[i].interval == "BLOCK") {
                                    i++
                                } else {
                                    found = true
                                }
                            } else {
                                if (body.timetables[day].entries[i].interval != "BLOCK") {
                                    found = true
                                } else {
                                    i++
                                }
                            }
                        }
                        if (found == false) {
                            n++
                        }
                    }


                    if (n<8) {
                        let lectureName = body.timetables[day].entries[i].lectureName

                        if (questionId == 1) { // was
                            responseSpeach = "Die nächste Vorlesung ist " + lectureName
                        }
                        else if (questionId == 2) { // wann
                            let start = utils.convertValueToHour(body.timetables[day].entries[i].startTime)
                            if (day == date && n == 0) {
                                responseSpeach = " heute"
                            } else if ((date + 1) % 7 == day) {
                                responseSpeach = " morgen"
                            } else if (day == date && n == 7) {
                                responseSpeach = " nächsten " + utils.convertValueToDay(day)
                            } else {
                                responseSpeach = " am " + utils.convertValueToDay(day)
                            }
                            responseSpeach = "Die nächste Vorlesung " + lectureName + " ist" + responseSpeach + " um " + start
                        }
                        else if (questionId == 3) { // wo
                            if (body.timetables[day].entries[i].locations[0] !== undefined) {
                                let room = body.timetables[day].entries[i].locations[0].room
                                let building = body.timetables[day].entries[i].locations[0].building
                                responseSpeach = "Die nächste Vorlesung " + lectureName + " findet in " + building + room + " statt"
                            } else {
                                responseSpeach = "Für die Vorlesung " + lectureName + " liegen keine Informationen vor"
                            }
                        }
                        else { // bei wem
                            let lecturer = body.timetables[day].entries[i].lecturerNames[0]
                            let lecturer2 = body.timetables[day].entries[i].lecturerNames[1]
                            responseSpeach = "Die nächste Vorlesung " + lectureName + " findet bei " + lecturer
                            if (lecturer2 !== undefined) {
                                responseSpeach = resonseSpeach + " und bei " + lecturer2
                            }
                            responseSpeach = responseSpeach + " statt"
                        }
                    } else {
                        responseSpeach = "Es konnte keine Vorlesung in den nächsten 7 Tagen gefunden werden"
                    }
                } else {
                    responseSpeach = "Es konnte keine Vorlesung gefunden werden. Bitte wiederholen Sie Ihre Anfrage.";
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

module.exports = ScheduleNextIntentHandler

