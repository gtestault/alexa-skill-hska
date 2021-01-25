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

                    if (levelOfBib == null) {                                       //if the whole building is for the bib
                        responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib
                    } else if (levelOfBib == 0) {                                   //if bib is on the ground level
                        responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " im Erdgeschoss."
                    } else if (levelOfBib == -1) {
                        responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " im Untergeschoss."
                    } else if (levelOfBib.includes("/")) {                         //check if bib is in two levels
                        let i = 0;
                        let firstLevelOfBib = '';
                        let secondLevelOfBib = '';

                        //everything in front of "/" is added into an array
                        while(levelOfBib[i] != "/") {
                            firstLevelOfBib = firstLevelOfBib + levelOfBib[i];
                            i++;
                        }

                        //everything after "/" is added into an array
                        for(let j = 0; j < levelOfBib.length; j++) {
                            if (levelOfBib[j] == "/") {
                                while (j < levelOfBib.length - 1) {
                                    j++;
                                    secondLevelOfBib = secondLevelOfBib + levelOfBib[j];
                                }
                            }
                        }

                        if (firstLevelOfBib == -1 && secondLevelOfBib == 0) {
                            responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " im Untergeschoss und Erdgeschoss."
                        } else if (firstLevelOfBib == 0 && secondLevelOfBib == 1) {
                            responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " im Erdgeschoss und in der 1. Etage."
                        } else if (firstLevelOfBib > 0 && secondLevelOfBib > 0) {
                            responseSpeech = "Die " + nameOfBib + " ist im Gebäude " + buildingOfBib + " in der " + firstLevelOfBib + ". und " + secondLevelOfBib + ". Etage."
                        }
                    } else {
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