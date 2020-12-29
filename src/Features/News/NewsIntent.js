//import {getSlotValues} from "../../Default/utils/HelperFunctions";

const Alexa = require("ask-sdk");
const https = require("https")

const NewsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NewsIntent';
    },
    async handle(handlerInput) {
        let courseOfStudiesId = ''
        const request = handlerInput.requestEnvelope.request
        //console.log(request)
        const slotValues = getSlotValues(request.intent.slots)
        //console.log(slotValues)

        let responseSpeach = ""
        try {
            //checks the slot value with the valid slot types
            if(utils.isSlotTypeValid(slotValues.courseOfStudies)) {
                courseOfStudiesId = slotValues.courseOfStudies.resolutions.resolutionsPerAuthority[0].values[0].value.id
                responseSpeech = await getNews(courseOfStudiesId);
                console.log("Bib: " + courseOfStudiesId);
            } else {
                responseSpeech = "Der Studiengang konnte nicht gefunden werden. Bitte versuchen Sie es erneut.";
            }
        } catch (e) {
            console.log(`No matching: ${e}`);
        }

        console.log(`TEXT TO SPEAK: ${responseSpeach}`);

        return handlerInput.responseBuilder
            .speak(responseSpeach)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const getNews = (courseOfStudiesName) => {
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
                    responseSpeach = `Auf dem schwarzen Brett für ${courseOfStudiesName} gibt es heute die folgende neue Meldung: ${body.content[0]}.`
                } else {
                    responseSpeach = `Auf dem schwarzen Brett für ${courseOfStudiesName} gibt es heute die folgenden neuen Meldungen:`
                    for (body.title in body) {
                        let i = 1;
                        responseSpeach == "Titel" + i + body.title
                        i++;
                    }
                    responseSpeach = `Bitte sage mir die Nummern der Meldungen die du hören möchtest.`



                    res.on('data', function (chunk) {
                        body.push(chunk);
                    });

                    res.on('end', () => {
                        body = JSON.parse(Buffer.concat(body).toString());
                        console.log(`~~~~ Data received: ${JSON.stringify(body)}`);

                        // body.content von den Nummern vorlesen, die Aufgezählt wurden
                        
                    });



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


module.exports = NewsIntentHandler
