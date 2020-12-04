const Alexa = require("ask-sdk");
const https = require("https")

const NewsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NewsIntent';
    },
    async handle(handlerInput) {
    let newsId = 0
    let requestedDate = ""
    const request = handlerInput.requestEnvelope.request
    const slotValues = request.intent.slots
    const newsResolutions = slotValues.SELECTED_NEWS.resolutions.resolutionsPerAuthority
    if (!newsResolutions || newsResolutions.length === 0 || newsResolutions[0].values.length === 0) {
        throw Error("news intent: no news id was resolved")
    }
    messageId = slotValues.SELECTED_CANTEEN.resolutions.resolutionsPerAuthority[0].values[0].value.id
    requestedDate = slotValues.DATES.value
    if (!requestedDate) {
        throw Error("news intent: no date value was resolved")
    }
    let responseSpeach = ""
    responseSpeach = await getCanteenInfo(messageId, requestedDate);
    console.log(`TEXT TO SPEAK: ${responseSpeach}`);
    return handlerInput.responseBuilder
        .speak(responseSpeach)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
}
};


const getNewsInfo = (messageId, requestedDate) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/hskampus-broker/api/news/since/?categoryId=3&updatedSince=${requestedDate}`;
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
                     for (const body.content of news) {
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


module.exports = NewsIntentHandler
