//import {getSlotValues} from "../../Default/utils/HelperFunctions";

const Alexa = require("ask-sdk");
const https = require("https")

const NewsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NewsIntent';
    },
    async handle(handlerInput) {
        let newsId = 0
        const request = handlerInput.requestEnvelope.request
        console.log(request)
        //const slotValues = getSlotValues(request.intent.slots)
        // console.log(slotValues)

        let responseSpeach = ""
        //responseSpeach = await getNewsInfo(messageId, requestedDate);
        console.log(`TEXT TO SPEAK: ${responseSpeach}`);
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/*
const getNewsInfo = (courseOfStudies) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/newsbulletinboard`;
        console.log(requestURI)
        const req = https.get(requestURI, function (res) {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                console.log(`~~~~ Data received: ${JSON.stringify(body)}`);
                if (body.length == 0) {
                    responseSpeach = "Es gibt heute keine neuen Meldungen"
                } else if (body.length == 1) {
                    responseSpeach = `Auf dem schwarzen Brett für ${facultyName} gibt es heute die folgende neue Meldung: ${news[0]}.`
                } else {
                    responseSpeach = `Auf dem schwarzen Brett für ${facultyName} gibt es heute die folgenden neuen Meldungen:`
                    for (const messageId.
                    content
                    of
                    body
                )
                    {
                        responseSpeach += " " + facultyName + ","
                    }
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
*/

module.exports = NewsIntentHandler