//import {getSlotValues} from "../../Default/utils/HelperFunctions";

const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils")
const got = require('got');
const dateFormat = require("dateformat");
const {escapeForSSML} = require("../../Default/utils/HelperFunctions");

const noNews = "Es gibt keine neuen Meldungen"

exports.StartedInProgressNewsIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "NewsIntent"
            && handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addDelegateDirective()
            .getResponse();
    }
};


exports.ListNewsIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "NewsIntent"
            && handlerInput.requestEnvelope.request.intent.slots.COURSE_OF_STUDIES.value
            && !handlerInput.requestEnvelope.request.intent.slots.NEWS_SELECTION.value
    },

    async handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots

        const newsResolutions = slotValues.COURSE_OF_STUDIES.resolutions.resolutionsPerAuthority
        if (!newsResolutions || newsResolutions.length === 0 || newsResolutions[0].values.length === 0) {
            throw Error("news intent: no news id was resolved")
        }
        const courseOfStudiesId = slotValues.COURSE_OF_STUDIES.resolutions.resolutionsPerAuthority[0].values[0].value.name
        let requestedDate = slotValues.DATES.value || dateFormat(new Date(), "yyyy-mm-dd")
        //console.log(requestedDate)
        if (!requestedDate) {
            throw Error("news intent: no date value was resolved")
        }

        let responseSpeach = await getNews(courseOfStudiesId, requestedDate, handlerInput);
        if (responseSpeach === noNews) {
           return handlerInput.responseBuilder.speak(responseSpeach).getResponse()
        }
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            .reprompt(responseSpeach)
            .addElicitSlotDirective('NEWS_SELECTION')
            .getResponse();
    }
};


exports.NewsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NewsIntent'
            && handlerInput.requestEnvelope.request.dialogState === "COMPLETED";
    },
    async handle(handlerInput) {
        let selectedNewsIndex = parseInt(handlerInput.requestEnvelope.request.intent.slots.NEWS_SELECTION.resolutions.resolutionsPerAuthority[0].values[0].value.name, 10)

        if (selectedNewsIndex === 0) {
            return handlerInput.responseBuilder
                .speak("Okay")
                .withShouldEndSession(true)
                .reprompt()
        }
        if (selectedNewsIndex > sessionAttributes.news.length || selectedNewsIndex < 0) {
            return handlerInput.responseBuilder
                .speak("Die gewählte Meldung gibt es nicht.")
                .withShouldEndSession(true)
                .reprompt()
        }
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const content = sessionAttributes.news[selectedNewsIndex - 1].content
        let speechText = escapeForSSML(content)
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .reprompt()
            .getResponse();
    }
};


const getNews = async (courseOfStudiesId, requestedDate, handlerInput) => {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let responseSpeach = "";
    let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/newsbulletinboard/${courseOfStudiesId}`;
    console.log(requestURI)
    const res = await got(requestURI)

    if (res.statusCode > 200) {
        throw new Error(`news intent: http client: received status code ${res.statusCode}`)
    }

    const news = JSON.parse(res.body);

        let relevantNews = news.filter(newsElement => newsElement.publicationDate === requestedDate)
        //relevantNews = news;

        if (!relevantNews || relevantNews.length === 0) {
            return noNews
        }

        if (relevantNews.length === 1) {
            return `Es gibt eine neue Meldung mit dem Titel: ${relevantNews[0]['title']} <break time="1s"/> ${relevantNews[0]['content']}.`
        }

        responseSpeach += `Es gibt neue Meldungen mit den folgenden Titeln:`

        let i = 1;
        for (const newsElement of relevantNews) {
            responseSpeach += `<break time="1s"/> Meldung ${i}: ${newsElement.title}.`
            i++;
        }
        responseSpeach = escapeForSSML(responseSpeach)
        sessionAttributes.news = relevantNews
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return responseSpeach + " Welche Meldung möchtest du hören?"
    //}


}

