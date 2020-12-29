const Alexa = require("ask-sdk");
const https = require("https");
const utils = require("../../Default/utils/Utils.js")

const LibraryIntentHandler = {
    //identify the request for the right intent and return true, if it is libraryintent
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LibraryIntent';
    },
    async handle(handlerInput) {
        let bibID = ''
        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots
        let responseSpeech = ""
        try {
            //checks the slot value with the valid slot types
            if(utils.isSlotTypeValid(slotValues.bibliothek)) {
                bibID = slotValues.bibliothek.resolutions.resolutionsPerAuthority[0].values[0].value.id
                responseSpeech = await getFreeSeats(bibID);
                console.log("Bib: " + bibID);
            } else {
                responseSpeech = "Die Bibliothek konnte nicht gefunden werden. Bitte wiederholen Sie Ihre Anfrage.";
            }
        } catch (e) {
            console.log(`No matching: ${e}`);
        }

        console.log(`Output Text: ${responseSpeech}`);
        return handlerInput.responseBuilder
            .speak(responseSpeech)
            .getResponse();
    }
};

const getFreeSeats = (library) => {
    //promise = eventual completion of an asynchronous operation and its resulting value
    return new Promise((resolve, reject) => {
        let responseSpeech = "";
        //use api of hska
        let requestURL = `https://www.iwi.hs-karlsruhe.de/iwii/REST/library/v2/info/${library}`;
        console.log(requestURL)
        const req = https.get(requestURL, function (res) {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', () => {
                if (res.statusCode == 200) {
                    body = JSON.parse(Buffer.concat(body).toString());
                    console.log(`Data received: ${JSON.stringify(body)}`);
                    //take availableSeats of json structure
                    //go into location and then to availableSeats
                    let freeSeats = body['location'][0]['availableSeats'];
                    console.log("Free seats: " + freeSeats);
                    responseSpeech = "In der Bibliothek sind " + freeSeats + " Plätze frei."
                } else {
                    responseSpeech = "Die Bibliothek konnte nicht gefunden werden oder der Eintrag ist nicht in der Datenbank. Bitte wiederholen Sie Ihre Anfrage.";
                }
                resolve(responseSpeech);
            });
        });
        req.end();
    });
}

module.exports = LibraryIntentHandler