module.exports = {

    capitalize(myString) {

        return myString.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    },

    randomElement(myArray) {
        return (myArray[Math.floor(Math.random() * myArray.length)]);
    },

    stripSpeak(str) {
        return (str.replace('<speak>', '').replace('</speak>', ''));
    },

    getSlotValues(filledSlots) {
        const slotValues = {};

        Object.keys(filledSlots).forEach((item) => {
            const name = filledSlots[item].name;

            if (filledSlots[item] &&
                filledSlots[item].resolutions &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                    case 'ER_SUCCESS_MATCH':
                        slotValues[name] = {
                            heardAs: filledSlots[item].value,
                            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                            ERstatus: 'ER_SUCCESS_MATCH'
                        };
                        break;
                    case 'ER_SUCCESS_NO_MATCH':
                        slotValues[name] = {
                            heardAs: filledSlots[item].value,
                            resolved: '',
                            ERstatus: 'ER_SUCCESS_NO_MATCH'
                        };
                        break;
                    default:
                        break;
                }
            } else {
                slotValues[name] = {
                    heardAs: filledSlots[item].value,
                    resolved: '',
                    ERstatus: ''
                };
            }
        }, this);

        return slotValues;
    },

    getExampleSlotValues(intentName, slotName) {

        let examples = [];
        let slotType = '';
        let slotValuesFull = [];

        let intents = model.interactionModel.languageModel.intents;
        for (let i = 0; i < intents.length; i++) {
            if (intents[i].name == intentName) {
                let slots = intents[i].slots;
                for (let j = 0; j < slots.length; j++) {
                    if (slots[j].name === slotName) {
                        slotType = slots[j].type;

                    }
                }
            }

        }
        let types = model.interactionModel.languageModel.types;
        for (let i = 0; i < types.length; i++) {
            if (types[i].name === slotType) {
                slotValuesFull = types[i].values;
            }
        }


        examples.push(slotValuesFull[0].name.value);
        examples.push(slotValuesFull[1].name.value);
        if (slotValuesFull.length > 2) {
            examples.push(slotValuesFull[2].name.value);
        }


        return examples;
    },

    sayArray(myData, penultimateWord = 'and') {
        let result = '';

        myData.forEach(function (element, index, arr) {

            if (index === 0) {
                result = element;
            } else if (index === myData.length - 1) {
                result += ` ${penultimateWord} ${element}`;
            } else {
                result += `, ${element}`;
            }
        });
        return result;
    },

    supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.)
    {                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay
        const hasDisplay =
            handlerInput.requestEnvelope.context &&
            handlerInput.requestEnvelope.context.System &&
            handlerInput.requestEnvelope.context.System.device &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;

        return hasDisplay;
    },

    getCustomIntents() {
        const modelIntents = model.interactionModel.languageModel.intents;

        let customIntents = [];


        for (let i = 0; i < modelIntents.length; i++) {

            if (modelIntents[i].name.substring(0, 7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest") {
                customIntents.push(modelIntents[i]);
            }
        }
        return customIntents;
    },

    getSampleUtterance(intent) {

        return randomElement(intent.samples);

    },

    getPreviousIntent(attrs) {

        if (attrs.history && attrs.history.length > 1) {
            return attrs.history[attrs.history.length - 2].IntentRequest;

        } else {
            return false;
        }

    },

    getPreviousSpeechOutput(attrs) {

        if (attrs.lastSpeechOutput && attrs.history.length > 1) {
            return attrs.lastSpeechOutput;

        } else {
            return false;
        }

    },

    emphasisSSML(text) {
        return `<emphasis level="moderate">${text}</emphasis>`
    },

    escapeForSSML(text) {
        return text.replace(/&/g, " und ");
    },

    timeDelta(t1, t2) {
        const dt1 = new Date(t1);
        const dt2 = new Date(t2);
        const timeSpanMS = dt2.getTime() - dt1.getTime();
        const span = {
            "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60)),
            "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)),
            "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)),
            "timeSpanDesc": ""
        };


        if (span.timeSpanHR < 2) {
            span.timeSpanDesc = span.timeSpanMIN + " minutes";
        } else if (span.timeSpanDAY < 2) {
            span.timeSpanDesc = span.timeSpanHR + " hours";
        } else {
            span.timeSpanDesc = span.timeSpanDAY + " days";
        }


        return span;
    }
}