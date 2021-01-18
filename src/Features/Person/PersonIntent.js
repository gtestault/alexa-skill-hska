const Alexa = require("ask-sdk");
const https = require("https");
const responseBuilder = require("./ResponseBuilder.js");
const utils = require("../../Default/utils/Utils.js");

const PersonIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PersonIntent';
    },
    async handle(handlerInput) {
        let personID = ''
        let title = ''
        let requestDate = ''
        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots
        let responseSpeach = ""
        try {
            if(utils.isSlotTypeValid(slotValues.person)) {
                personID = slotValues.person.resolutions.resolutionsPerAuthority[0].values[0].value.id
                //requestDate = slotValues.DATE.value

            } else if(utils.isSlotTypeValid(slotValues.person)) {
                title = slotValues.anrede.resolutions.resolutionsPerAuthority[0].values[0].value.name
            } else {
                responseSpeach = "Der Dozent, die Dozentin konnte nicht gefunden werden. Bitte wiederholen Sie Ihre Anfrage.";
                //throw error maybe?
            }
            responseSpeach = await getConsultationHour(personID);

            console.log("Person: " + personID + " datum: " + requestDate + " anrede: " + title);
        } catch (e) {
            console.log(`~~~~ No matching: ${e}`);
        }

        console.log(`TEXT TO SPEAK: ${responseSpeach}`);
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const getConsultationHour = (lecturer) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/lecturersconsultationhours/${lecturer}`;
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
                    //let room = utils.getRoomById(body[0].idRoom);
                    responseSpeach = responseBuilder.getResponseSpeech(body);
                } else {
                    responseSpeach = "Der Dozent, die Dozentin konnte nicht gefunden werden oder der Eintrag ist nicht in der Datenbank. Bitte wiederholen Sie Ihre Anfrage.";
                }
                responseSpeach = utils.validateResponseOnSpecialChars(responseSpeach);
                resolve(responseSpeach);
            });
        });
        req.end();
    });
}

module.exports = PersonIntentHandler