const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils.js")

const ScheduleLecturerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleLecturerIntent';
    },
    async handle(handlerInput) {
        let courseId
        let groupId = 0
        let semesterId
        let lectureId
        let requestedDate

        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots

        let responseSpeach = ""

        try {
            if (utils.isSlotTypeValid(slotValues.course)) {

                courseId = slotValues.course.resolutions.resolutionsPerAuthority[0].values[0].value.id
                semesterId = slotValues.semester.resolutions.resolutionsPerAuthority[0].values[0].value.id
                if (slotValues.groups.resolutions.resolutionsPerAuthority[0].values[0].value.id !== "NONE") {
                    groupId = slotValues.groups.resolutions.resolutionsPerAuthority[0].values[0].value.id
                }
                lectureId = slotValues.lecture.resolutions.resolutionsPerAuthority[0].values[0].value.name
                requestedDate = slotValues.date.value

                responseSpeach = await getScheduleInfo(courseId, semesterId, groupId, lectureId, requestedDate);

                console.log(courseId + " " + semesterId + ". Semester (Gruppe " + groupId + ") " + lectureId + ", " + requestedDate);
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


const getScheduleInfo = (courseId, semesterId, groupsId, lectureId, date) => {
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
                    let n = 0
                    let day = ''
                    let lecturer = ''
                    let lecturer2 = ''
                    let found = 0

                    console.log("gesucht: " + lectureId)

                    while (n<7) {
                        if (body.timetables[n].entries[i] === undefined) {
                            n++
                            i=0
                        } else {
                            if (lectureId == body.timetables[n].entries[i].lectureName && date == utils.convertValueToDay(body.timetables[n].entries[i].day).toLowerCase()){
                                day = utils.convertValueToDay(body.timetables[n].entries[i].day)
                                lecturer = body.timetables[n].entries[i].lecturerNames[0]
                                lecturer2 = body.timetables[n].entries[i].lecturerNames[1]
                                console.log(lecturer + ", " + lecturer2)
                                if (found > 0){
                                    responseSpeach = responseSpeach + ", und "
                                }
                                found = found + 1
                                responseSpeach = responseSpeach + " am " + day + " bei " + lecturer
                                if (lecturer2 !== undefined) {
                                    responseSpeach = resonseSpeach + " und bei " + lecturer2
                                }
                            }
                            i++
                        }
                    }
                    if(found == 0) {
                        responseSpeach = "Am " + date + " findet " + lectureId + " nicht statt."
                    } else {
                        responseSpeach = "Die Vorlesung " + lectureId + " findet " + responseSpeach + " statt"
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

module.exports = ScheduleLecturerIntentHandler

