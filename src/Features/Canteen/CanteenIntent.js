const Alexa = require("ask-sdk");
const https = require("https")
const http = require("express/lib/request");
const got = require("got");
const {emphasisSSML} = require("../../Default/utils/HelperFunctions");
const {escapeForSSML} = require("../../Default/utils/HelperFunctions");
const MockServerFactory = require("../../Testing/MockServer").init()

const CanteenIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CanteenIntent';
    },
    async handle(handlerInput) {
        let mensaId = 0
        let requestedDate = ""
        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots
        const canteenResolutions = slotValues.SELECTED_CANTEEN.resolutions.resolutionsPerAuthority
        if (!canteenResolutions || canteenResolutions.length === 0 || canteenResolutions[0].values.length === 0) {
            throw Error("canteen intent: no canteen id was resolved")
        }
        mensaId = slotValues.SELECTED_CANTEEN.resolutions.resolutionsPerAuthority[0].values[0].value.id
        requestedDate = slotValues.DATES.value
        if (!requestedDate) {
            throw Error("canteen intent: no date value was resolved")
        }
        let responseSpeach = ""
        responseSpeach = await getCanteenInfo(mensaId, requestedDate);
        console.log(`TEXT TO SPEAK: ${responseSpeach}`);
        return handlerInput.responseBuilder
            .speak(responseSpeach)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const getServerAddress = () => {
    return MockServerFactory.getInstance().getServerAddress()
}

const getCanteenInfo = async (mensaId, requestedDate) => {
    let responseSpeach = "";
    let requestURI = `${getServerAddress()}/hskampus-broker/api/canteen/${mensaId}/date/${requestedDate}`;
    const res= await got(requestURI);
    if (res.statusCode > 200) {
        throw new Error(`canteen intent: http client: received status code ${res.statusCode}`)
    }
    const body = JSON.parse(res.body);
    if (!body || body.length === 0) {
        throw new Error(`canteen intent: http: client: unexpected response structure, received following data: ${body}`)
    }
    let canteen = body[0]
    if (!isCanteenOpen(canteen)) {
        responseSpeach = "Diese Mensa hat leider an diesem Tag zu."
        return responseSpeach
    }
    const canteenName = escapeForSSML(canteen.name);
    if (!canteen.lines || canteen.lines.length === 0) {
        throw new Error("canteen intent: http client: unexpected canteen object structure: no lines on canteen object")
    }
    responseSpeach += `In der Mensa ${canteenName} gibt es folgendes zu essen: `

    for (let line of canteen.lines) {
        if (line.closed || line.meals.length === 0) { // skip lines with no meals
            continue
        }
        const lineMeal = line.meals[0] // there is only one meal per line: we read it directly
        responseSpeach += `${emphasisSSML(escapeForSSML(line.name) + ":")} ${escapeForSSML(lineMeal.meal)} ${escapeForSSML(lineMeal.dish)}. `
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

/*
const CanteenIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'CanteenIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from CanteenIntent. ';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots);
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: SELECTED_CANTEEEN
        if (slotValues.SELECTED_CANTEEEN.heardAs) {
            slotStatus += ' slot SELECTED_CANTEEEN was heard as ' + slotValues.SELECTED_CANTEEEN.heardAs + '. ';
        } else {
            slotStatus += 'slot SELECTED_CANTEEEN is empty. ';
        }
        if (slotValues.SELECTED_CANTEEEN.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if (slotValues.SELECTED_CANTEEEN.resolved !== slotValues.SELECTED_CANTEEEN.heardAs) {
                slotStatus += 'synonym for ' + slotValues.SELECTED_CANTEEEN.resolved + '. ';
            } else {
                slotStatus += 'match. '
            } // else {
            //
        }
        if (slotValues.SELECTED_CANTEEEN.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.SELECTED_CANTEEEN.heardAs + '" to the custom slot type used by slot SELECTED_CANTEEEN! ');
        }

        if ((slotValues.SELECTED_CANTEEEN.ERstatus === 'ER_SUCCESS_NO_MATCH') || (!slotValues.SELECTED_CANTEEEN.heardAs)) {
            slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('CanteenIntent', 'SELECTED_CANTEEEN'), 'or');
        }

        say += slotStatus;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};
*/
// 2. Constants ===========================================================================

// Here you can define static data, to be used elsewhere in your code.  For example:
//    const myString = "Hello World";
//    const myArray  = [ "orange", "grape", "strawberry" ];
//    const myObject = { "city": "Boston",  "state":"Massachusetts" };

module.exports = CanteenIntentHandler

