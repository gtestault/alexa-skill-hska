const Alexa = require("ask-sdk");
const https = require("https")
const http = require("express/lib/request");
const got = require("got");
const {emphasisSSML} = require("../../Default/utils/HelperFunctions");
const {escapeForSSML} = require("../../Default/utils/HelperFunctions");
const MockServerFactory = require("../../Testing/MockServer").init()

module.exports.CanteenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CanteenIntent';
    },
    async handle(handlerInput) {
        let canteenId = getCanteenId(handlerInput)
        let requestedDate = getRequestedDate(handlerInput)
        let responseSpeach = await getCanteenInfo(canteenId, requestedDate, false);
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            .getResponse();
    }
};

module.exports.VegiCanteenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VegiCanteenIntent';
    },
    async handle(handlerInput) {
        let canteenId = getCanteenId(handlerInput)
        let requestedDate = getRequestedDate(handlerInput)
        let responseSpeach = await getCanteenInfo(canteenId, requestedDate, true)
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            .getResponse();
    }
}

const getCanteenId = (handlerInput) => {
    const slotValues = handlerInput.requestEnvelope.request.intent.slots
    const canteenResolutions = slotValues.SELECTED_CANTEEN.resolutions.resolutionsPerAuthority
    if (!canteenResolutions || canteenResolutions.length === 0 || canteenResolutions[0].values.length === 0) {
        throw Error("canteen intent: no canteen id was resolved")
    }
    return slotValues.SELECTED_CANTEEN.resolutions.resolutionsPerAuthority[0].values[0].value.id
}

const getRequestedDate = (handlerInput) => {
    const slotValues = handlerInput.requestEnvelope.request.intent.slots
    let requestedDate = slotValues.DATES.value
    if (!requestedDate) {
        throw Error("canteen intent: no date value was resolved")
    }
    return requestedDate
}

const getServerAddress = () => {
    if (process.env.MOCK_SERVER) {
        return MockServerFactory.getInstance().getServerAddress()
    } else {
        return "https://www.iwi.hs-karlsruhe.de"
    }
}


const loadCanteenData = async (canteenId, requestedDate) => {
    let requestURI = `${getServerAddress()}/hskampus-broker/api/canteen/${canteenId}/date/${requestedDate}`;
    const res = await got(requestURI);
    if (res.statusCode > 200) {
        throw new Error(`canteen intent: http client: received status code ${res.statusCode}`)
    }
    const body = JSON.parse(res.body);
    if (!body || body.length === 0) {
        throw new Error(`canteen intent: http: client: unexpected response structure, received following data: ${body}`)
    }
    return body[0]
}

const getCanteenInfo = async (canteenId, requestedDate, vegiOnly) => {
    const canteen = await loadCanteenData(canteenId, requestedDate)
    if (!isCanteenOpen(canteen)) {
        responseSpeach = "Diese Mensa hat leider an diesem Tag zu."
        return responseSpeach
    }
    const canteenName = escapeForSSML(canteen.name);
    if (!canteen.lines || canteen.lines.length === 0) {
        throw new Error("canteen intent: unexpected canteen object structure: no lines on canteen object")
    }
   return vegiOnly ? getVegiSpokenMenu(canteenName, canteen) : getSpokenMenu(canteenName, canteen)

}

const getSpokenMenu = (canteenName, canteen) => {
    let responseSpeach = `In der Mensa ${canteenName} gibt es folgendes zu essen: `
    for (let line of canteen.lines) {
        if (line.closed || line.meals.length === 0) { // skip lines with no meals
            continue
        }
        const lineMeal = line.meals[0] // there is only one meal per line: we read it directly
        responseSpeach += `<break time="1s"/>${emphasisSSML(escapeForSSML(line.name) + ":")} ${escapeForSSML(lineMeal.meal)} ${escapeForSSML(lineMeal.dish)}. `
    }
    return responseSpeach
}

const getVegiSpokenMenu = (canteenName, canteen) => {
    let openLines = canteen.lines.filter(line => !line.closed && line.meals.length > 0) // skip lines with no meals
    let vegLines = openLines.filter(line => line.meals[0].veg) // filter by vegetarian meals
    if (vegLines.length === 0) {
        return `In der Mensa ${canteenName} gibt es heute leider keine Linie mit vegetarischem essen.`
    }
    let responseSpeach = `In der Mensa ${canteenName} haben folgende Linien ein vegetarisches essen: `
    for (let line of vegLines) {
        const lineMeal = line.meals[0] // there is only one meal per line: we read it directly
        responseSpeach += `<break time="1s"/>${emphasisSSML(escapeForSSML(line.name) + ":")} ${escapeForSSML(lineMeal.meal)} ${escapeForSSML(lineMeal.dish)}. `
    }
    return responseSpeach
}


// We consider a Canteen as closed, if all the lines of the canteen are closed.
const isCanteenOpen = (canteen) => {
    for (const line of canteen.lines) {
        if (!line.closed) {
            return true;
        }
    }
    return false;
}
