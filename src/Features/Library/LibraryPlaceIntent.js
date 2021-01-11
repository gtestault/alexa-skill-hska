const Alexa = require("ask-sdk");
const https = require("https");
const utils = require("../../Default/utils/Utils.js")

const LibraryPlaceIntentHandler = {
    //identify the request for the right intent and return true, if it is LibraryPlaceIntent
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LibraryPlaceIntent';
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
                responseSpeech = await getBuilding(bibID);
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

const getBuilding = (library) => {
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
                    let buildingOfBib = body['location'][0]['building'];
                    let nameOfBib = body['location'][0]['longName'];
                    let levelOfBib = body['location'][0]['level'];
                    if (levelOfBib == null) {
                        responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib
                    } else if (levelOfBib == 0) {
                        responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " im Erdgeschoss."
                    } else if (levelOfBib.includes("/")) {
                        if (levelOfBib[0] == -1 && levelOfBib[2] == 0) {
                            responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " im Untergeschoss und Erdgeschoss."
                        } else if (levelOfBib[0] == 0 && levelOfBib[2] == 1) {
                            responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " im Erdgeschoss und in der 1. Etage."
                        } else if (levelOfBib[0] > 0 && levelOfBib[2] > 0) {
                            responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " in der " + levelOfBib[0] + ". und " + levelOfBib[2] + ". Etage."
                        }
                    }else {
                        responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " in der " + levelOfBib + ". Etage."
                    }
                } else {
                    responseSpeech = "Die " + nameOfBib + " konnte nicht gefunden werden oder der Eintrag ist nicht in der Datenbank. Bitte wiederholen Sie Ihre Anfrage.";
                }
                resolve(responseSpeech);
            });
        });
        req.end();
    });
}

module.exports = LibraryPlaceIntentHandler