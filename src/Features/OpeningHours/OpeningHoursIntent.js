const Alexa = require("ask-sdk");
const https = require("https");
const { off } = require("process");

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
        const isOpeningHoursIntent = Alexa.getIntentName(handlerInput.requestEnvelope) == 'OpeningHoursIntent';

        const request = handlerInput.requestEnvelope.request
        const slotValues = request.intent.slots;

        const office = slotValues.office.value
        const building = office ? slotValues.office.slotValue.resolutions.resolutionsPerAuthority[0].values[0].value : slotValues.poi.slotValue.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        
        const type = office ? 'offices' : 'generals';

        let response;
        try {
            poiObj = await getPOI(building, type);
            response = isOpeningHoursIntent ? await handleOpeningHours(poiObj) : await handleBuildingOpened(poiObj, slotValues.date.value);
        } catch (e) {
            console.log(`~~~~ No matching: ${e}`);
            response = e;
        }

        console.log(`TEXT TO SPEAK: '${response}'`);
        return handlerInput.responseBuilder
            .speak(response)
            .getResponse();
    }
};

const getPOI = (building, type) => {
    return new Promise((resolve, reject) => {
        const uri = requestURI + 'poi/' + type + "/" + building.id;
        const req = https.get(uri, (req, res) => {
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });

            req.on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                console.log(body)
                if (body) {
                    resolve(body);
                } else {
                    reject("Es konnten leider keine Informationen zu " + building.name + " gefunden werden.");
                }
            });
        });
    });
}

const handleOpeningHours = (poi) => {
    return new Promise((resolve, reject) => {
        const convertedOpeningHours = convertOpeningHours(poi.openingHours, reject);
        const prefix = "Das " + poi.name + " hat ";
        let textArr = [];
        let text = prefix;
        for (var i = 0; i < convertedOpeningHours.length - 1; i++) {
            let isSequence = false;
            let start = convertedOpeningHours[i];

            for (var j = i; j < convertedOpeningHours.length - 1; j++) {
                let next = convertedOpeningHours[j + 1];
                if (next && next.Opens === start.Opens && next.Closes === start.Closes) {
                    isSequence = true;
                } else {
                    if (isSequence) {
                        // Last day in sequence
                        textArr.push(start.Day + " bis " + convertedOpeningHours[j].Day + " von "
                            + start.Opens + " bis " + start.Closes + " Uhr");
                    } else {
                        // One day with unique opening hours
                        textArr.push(start.Day + " von " + start.Opens + " bis " + start.Closes + " Uhr");
                    }

                    i = j;
                    break;
                }
            }
        }

        for (var i = 0; i < textArr.length; i++) {
            text += textArr[i];
            if (textArr.length - 2 == i) {
                text += ' und ';
            } else if (i < textArr.length - 2) {
                text += ', ';
            }
        }
        resolve(text + " geöffnet");
    })
}


const handleBuildingOpened = (poi, date) => {
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

module.exports = OpeningHoursHandler

