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
            if (utils.isSlotTypeValid(slotValues.course)) {

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
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
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
                    console.log(`~~~~ Data received: ${JSON.stringify(body)}`);

                    let i = 0
                    let n = 0
                    let found = false
                    const today = new Date()
                    const date = (today.getDay() + 6) % 7
                console.log(date)
                    const time = today.getHours() * 60 + today.getMinutes()

                    while (n<8 && found == false) {
                console.log(n + " " + found + " " + i)
                        if (n == 0 && body.timetables[date].entries[i] !== undefined) {
                            if (time > body.timetables[date].entries[i].startTime) {
                                i++
                            } else {
                                found = true
                            }
                        } else if (n == 7 && body.timetables[date].entries[0] !== undefined) {
                            if (time > body.timetables[date].entries[0].startTime) {
                                found = true
                                i = 0
                            } else {
                                n++
                            }
                        } else {
                            n++
                            if (body.timetables[(date+n) % 7].entries[0] !== undefined) {
                                found = true
                                i = 0
                            }
                        }
                    }

                    if (n<8) {
                        let day = (date + n) % 7
                    console.log(n + " " + day + " " + i)
                        let lectureName = body.timetables[day].entries[i].lectureName
                        let start = utils.convertValueToHour(body.timetables[day].entries[i].startTime)
                        let room = " statt"
                        if (body.timetables[day].entries[i].locations[0] !== undefined) {
                            room = body.timetables[day].entries[i].locations[0].room + room
                        }
                        let building = "online "
                        if (body.timetables[day].entries[i].locations[0] !== undefined) {
                            building = "in " + body.timetables[day].entries[i].locations[0].building
                        }
                        let lecturer = body.timetables[day].entries[i].lecturerNames[0]
                        let lecturer2 = body.timetables[day].entries[i].lecturerNames[1]
                    console.log(n + " " + day + " " + date + " " + questionId)
                        if (questionId == 1) { // was
                            responseSpeach = "Die nächste Vorlesung ist " + lectureName
                        } else if (questionId == 2) { // wann
                            if (day == date && n == 0) {
                                responseSpeach = " heute "
                            } else if ((date + 1) % 7 == day) {
                                responseSpeach = " morgen "
                            } else if (day == date && n == 7) {
                                responseSpeach = " nächsten " + utils.convertValueToDay(day)
                            } else {
                                responseSpeach = " am " + utils.convertValueToDay(day)
                            }
                            responseSpeach = "Die nächste Vorlesung ist" + responseSpeach + " um " + start
                        } else if (questionId == 3) { // wo
                            responseSpeach = "Die nächste Vorlesung " + lectureName + " findet " + building + room
                        } else { // bei wem
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

