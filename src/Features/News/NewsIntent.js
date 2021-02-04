//import {getSlotValues} from "../../Default/utils/HelperFunctions";

const Alexa = require("ask-sdk");
const https = require("https")
const utils = require("../../Default/utils/Utils")
const got = require('got');
const dateFormat = require("dateformat");

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

        let responseSpeech = await getNews(courseOfStudiesId, requestedDate, handlerInput);
        return handlerInput.responseBuilder
            .speak(responseSpeech)
            .reprompt(responseSpeech)
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
        let selectedNewsIndex = handlerInput.requestEnvelope.request.intent.slots.NEWS_SELECTION.value
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const content = sessionAttributes.news[parseInt(selectedNewsIndex, 10) - 1].content
        let speechText = content
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};


const getNews = async (courseOfStudiesId, requestedDate, handlerInput) => {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let responseSpeech = "";
    let requestURI = `https://www.iwi.hs-karlsruhe.de/iwii/REST/newsbulletinboard/${courseOfStudiesId}`;
    console.log(requestURI)
    const res = await got(requestURI)

    if (res.statusCode > 200) {
        throw new Error(`news intent: http client: received status code ${res.statusCode}`)
    }

    const body = JSON.parse(res.body);

    let news = body;
    
        relevantNews = news.filter(newsElement => newsElement.publicationDate === requestedDate)

        if (!relevantNews || relevantNews.length === 0) {
            return "Es gibt keine neuen Meldungen"
        }

        if (relevantNews.length === 1) {
            return `Es gibt eine neue Meldung mit dem Titel: ${body[0]['title']} <break time="1s"/> ${body[0]['content']}.`
        }

        responseSpeech += `Es gibt neue Meldungen mit den folgenden Titeln:`

        let i = 1;
        for (const newsElement of relevantNews) {
            responseSpeech += `<break time="1s"/> Meldung ${i}: ${newsElement.title}.`
            i++;
        }
        sessionAttributes.news = relevantNews
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return responseSpeech + " Welche Meldung möchtest du hören?"



}


