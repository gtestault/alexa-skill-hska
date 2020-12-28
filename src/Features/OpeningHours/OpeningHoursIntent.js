const Alexa = require("ask-sdk");
const https = require("https")

const requestURI = 'https://www.iwi.hs-karlsruhe.de/hskampus-broker/api/';
const weekdays = [
    { Day: 'Montag', Short: 'Mo' },
    { Day: 'Dienstag', Short: 'Di' },
    { Day: 'Mittwoch', Short: 'Mi' },
    { Day: 'Donnerstag', Short: 'Do' },
    { Day: 'Freitag', Short: 'Fr' },
    { Day: 'Samstag', Short: 'Sa' },
    { Day: 'Sonntag', Short: 'So' },

];


const OpeningHoursHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'OpeningHoursIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuildingOpenedIntent');
    },
    async handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots;

        const date = slotValues.date.value;
        const office = slotValues.office.value
        const poi = slotValues.poi.value

        const building = office ? office : poi;
        const type = office ? 'offices' : 'generals';

        let response;
        try {
            poiObj = await getPOI(building, type);
            response = await handleOpeningHoursIntent(poiObj, date);
        } catch (e) {
            console.log(`~~~~ No matching: ${e}`);
            response = e;
        }

        console.log(`TEXT TO SPEAK: '${response}'`);
        return handlerInput.responseBuilder
            .speak(response)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const getPOI = (name, type) => {
    return new Promise((resolve, reject) => {
        const uri = requestURI + 'poi/' + type;
        const req = https.get(uri, (req, res) => {
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });

            req.on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                const found = body.find(x => x.name.toUpperCase() === name.toUpperCase());

                if (found) {
                    resolve(found);
                } else {
                    reject("Es konnten leider keine Informationen zu " + name + " gefunden werden.");
                }
            });
        });
    });
}


const handleOpeningHoursIntent = (poi, date) => {
    return new Promise((resolve, reject) => {
        const append = handleDate(date);
        let newDate = new Date();
        newDate.setDate(newDate.getDate(newDate) + append);
        const convertedOpeningHours = convertOpeningHours(poi.openingHours, reject);

        dayIndex = newDate.getDay() - 1 == -1 ? 6 : newDate.getDay() - 1;

        isOpened = convertedOpeningHours[dayIndex].Opens;

        let textAppend;
        if (isOpened) {
            textAppend = " von " + convertedOpeningHours[dayIndex].Opens + " bis " + convertedOpeningHours[dayIndex].Closes + " Uhr geöffnet."
        } else {
            textAppend = " nicht geöffnet";
        }
        resolve("Das " + poi.name + " hat " + (date ? date : "heute") + textAppend);
    })
}

function convertOpeningHours(openingHours, reject) {
    if (openingHours) {
        const splitted = splitString(openingHours);
        const convertedWeekdays = weekdays;

        for (let i = 0; i < splitted.length; i++) {

            // Is weekday
            if (!weekdays.find(x => splitted[i].includes(x.Short))) {
                continue;
            }

            isSequence = splitted[i + 1] == "-";

            if (isSequence) {
                const sequenceEnd = splitted[i + 2];
                for (let index = 0; index < weekdays.length; index++) {
                    const obj = weekdays[index];
                    obj.Opens = splitted[i + 3];
                    obj.Closes = splitted[i + 5];
                    convertedWeekdays[index] = obj;
                    if (sequenceEnd.includes(weekdays[index].Short)) {
                        break;
                    }
                }
                i += 2;
            } else {
                let found = weekdays.find(x => splitted[i].includes(x.Short));
                let index = weekdays.indexOf(found);

                if (index >= 0) {
                    const obj = weekdays[index];
                    obj.Opens = splitted[i + 1];
                    obj.Closes = splitted[i + 3];
                    convertedWeekdays[index] = obj;
                }
            }
        }
        return convertedWeekdays;
    } else {
        reject("Es konnten leider keine Öffnungszeiten ermittelt werden.");
    }
}

function splitString(openingHours) {
    const arr = openingHours.split(/(-)/g);
    const splitted = [];
    arr.forEach((string) => {
        const tmp = string.split(" ");
        tmp.forEach(word => splitted.push(word));
    });

    return splitted;
}

function handleDate(date) {
    switch (date) {
        case 'morgen':
            return 1;
        case 'übermorgen':
            return 2
        default:
            return 0;
    }
}


const getCanteenInfo = (mensaId, requestedDate) => {
    return new Promise((resolve, reject) => {
        let responseSpeach = "";
        let requestURI = `https://www.iwi.hs-karlsruhe.de/hskampus-broker/api/canteen/${mensaId}/date/${requestedDate}`;
        const req = https.get(requestURI, function (res) {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                console.log(`~~~~ Data received: ${JSON.stringify(body)}`);
                let canteen = body[0]
                if (!isCanteenOpen(canteen)) {
                    responseSpeach = "Diese Mensa hat leider an diesem Tag zu."
                    resolve(responseSpeach)
                    return
                }
                const lineName = body[0].lines[0].name.replace("&", " und ");
                let meals = []
                for (const meal of body[0].lines[0].meals) {
                    meals.push(meal.meal)
                }
                if (meals.length == 0) {
                    responseSpeach = "In der Mensa gibt es nichts zu essen."
                } else if (meals.length == 1) {
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
                console.log(`~~~~ Error in GET request: ${err}`);
                responseSpeach = "Ich konnte die Mensa daten leider nicht laden. Versuche es bitte später nochmal."
                resolve(responseSpeach)
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

module.exports = OpeningHoursHandler

