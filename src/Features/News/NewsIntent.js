//import {getSlotValues} from "../../Default/utils/HelperFunctions";

const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils")


const NewsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NewsIntent';
    },
    async handle(handlerInput) {
        let courseOfStudiesId = ''
        const request = handlerInput.requestEnvelope.request
        //console.log(request)
        const slotValues = request.intent.slots
        //console.log(slotValues)


        const newsResolutions = slotValues.COURSE_OF_STUDIES.resolutions.resolutionsPerAuthority
        if (!newsResolutions || newsResolutions.length === 0 || newsResolutions[0].values.length === 0) {
            throw Error("news intent: no news id was resolved")
        }
        courseOfStudiesId = slotValues.COURSE_OF_STUDIES.resolutions.resolutionsPerAuthority[0].values[0].value.id
        let requestedDate = slotValues.DATES.value
        if (!requestedDate) {
            throw Error("news intent: no date value was resolved")
        }

        let responseSpeach = ""
        responseSpeach = await getNews(courseOfStudiesId, requestedDate);
        console.log(`TEXT TO SPEAK: ${responseSpeach}`);
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const getNews = async (courseOfStudiesId, requestedDate) => {
    let responseSpeach = "";
    let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/newsbulletinboard/${courseOfStudiesId}`;
    const res = await got(requestURI)

    if (res.statusCode > 200) {
        throw new Error(`news intent: http client: received status code ${res.statusCode}`)
    }

    const body = JSON.parse(res.body);

    let news = body[0];
    let publicationDate;
    //for (requestedDate === publicationDate in news) {}


    if (!body || body.length === 0) {
        responseSpeach = "Es gibt keine neuen Meldungen"
    }
    else if (body.length === 1) {
        responseSpeach = `Es gibt eine neue Meldung mit dem Titel: ${news.title}`
    }


    responseSpeach += `Es gibt neue Meldungen mit den folgenden Titeln:`

    for (body.title in body) {
        let i = 1;
        responseSpeach = "Titel" + i + body.title
        i++;
    }
    // responseSpeach = `Bitte sage mir die Nummern der Meldungen die du hören möchtest.`




}


module.exports = NewsIntentHandler
