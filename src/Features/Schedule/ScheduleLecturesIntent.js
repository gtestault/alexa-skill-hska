const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils.js")

const ScheduleLecturesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleLecturesIntent';
    },
    async handle(handlerInput) {
        let courseId
        let groupId = 0
        let semesterId
        let dateId

        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots

        let responseSpeach = ""

        try {
            if (utils.isSlotTypeValid(slotValues.course) && utils.isSlotTypeValid(slotValues.semester)) {

                courseId = slotValues.course.resolutions.resolutionsPerAuthority[0].values[0].value.id
                semesterId = slotValues.semester.resolutions.resolutionsPerAuthority[0].values[0].value.id
                if (slotValues.groups.resolutions !== undefined) {
                    groupId = slotValues.groups.resolutions.resolutionsPerAuthority[0].values[0].value.id
                }
                dateId =  slotValues.date.resolutions.resolutionsPerAuthority[0].values[0].value.id

                responseSpeach = await getScheduleInfo(courseId, semesterId, groupId, dateId);

                console.log(courseId + " (Gruppe " + groupId + ") " + lectureId + ", " + dateId);
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


const getScheduleInfo = (courseId, semesterId, groupsId, date) => {
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

                    let i = 0
                    let start = ''
                    let found = 0
                    let day = false

                    const today = new Date()

                    if (date == 7) {            // heute -> wochentag
                        date = (today.getDay() + 6) % 7
                        day = true
                        responseSpeach = "Heute finden noch folgende Vorlesungen statt: "
                    } else if (date == 8) {     // morgen -> wochentag
                        date = (today.getDay() + 7) % 7
                        responseSpeach = "Morgen finden folgende Vorlesungen statt: "
                    } else if (date == 9) {     // übermorgen -> wochentag
                        date = (today.getDay() + 8) % 7
                        responseSpeach = "Übermorgen finden folgende Vorlesungen statt: "
                    } else {
                        responseSpeach = "Am " + utils.convertValueToDay(date) + " finden folgende Vorlesungen statt: "
                    }

                    let nextDate = new Date()
                    nextDate.setDate(nextDate.getDate()+7) // + 1 Woche

                    while (body.timetables[date].entries[i] !== undefined) {
                        if (!(day == true && today.getHours() * 60 + today.getMinutes() >  body.timetables[date].entries[i].startTime)) {
                            const firstDate = new Date(body.timetables[date].entries[i].firstDate)
                            firstDate.setHours(body.timetables[date].entries[i].startTime / 60, body.timetables[date].entries[i].startTime % 60)
                            if (!(body.timetables[date].entries[i].interval == "BLOCK" && (firstDate < today || nextDate < firstDate))) {
                                let lectureName = body.timetables[date].entries[i].lectureName
                                start = utils.convertValueToHour(body.timetables[date].entries[i].startTime)
                                if (found > 0) {
                                    responseSpeach = responseSpeach + `<break time="1s"/>`
                                }
                                found = found + 1
                                responseSpeach = responseSpeach + lectureName + " um " + start
                            }
                        }
                        i++
                    }
                    if (found == 0){
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

module.exports = ScheduleLecturesIntentHandler

