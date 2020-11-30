const Alexa = require("ask-sdk");
const https = require("https")

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


const getCanteenInfo = (mensaId, requestedDate) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/hskampus-broker/api/canteen/${mensaId}/date/${requestedDate}`;
        console.log(requestURI)
        const req = https.get(requestURI, function (res) {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', () => {
                if (res.statusCode > 200) {
                    throw new Error(`canteen intent: http client: received status code ${res.statusCode}`)
                }
                body = JSON.parse(Buffer.concat(body).toString());
                if (!body || body.length === 0) {
                   throw new Error(`canteen intent: http: client: unexpected response structure, received following data: ${body}`)
                }
                let canteen = body[0]
                if (!isCanteenOpen(canteen)) {
                    responseSpeach = "Diese Mensa hat leider an diesem Tag zu."
                    resolve(responseSpeach)
                    return
                }
                const canteenName = canteen.name.replace("&", " und ");
                if (!canteen.lines || canteen.lines.length === 0) {
                   throw new Error("canteen intent: http client: unexpected canteen object structure: no lines on canteen object")
                }
                const lineName = canteen.lines[0].name.replace("&", " und ");
                let meals = []
                for (const meal of canteen.lines[0].meals) {
                    meals.push(meal.meal)
                }
                if (meals.length === 0) {
                    responseSpeach = "In der Mensa gibt es nichts zu essen."
                } else if (meals.length === 1) {
                    responseSpeach = `In der Mensa gibt es auf der Linie ${lineName} heute folgendes zu essen: ${meals[0]}.`
                } else {
                    responseSpeach = `In der Mensa gibt es auf der Linie ${lineName} heute folgendes zu essen:`
                    for (const mealName of meals) {
                        responseSpeach += " " + mealName + ","
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

