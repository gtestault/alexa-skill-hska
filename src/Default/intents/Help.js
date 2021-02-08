const {randomElement} = require("../utils/HelperFunctions");
const {getCustomIntents} = require("../utils/HelperFunctions");
const {getSampleUtterance} = require("../utils/HelperFunctions");
const sampleQuestions = require("../../sampleQuestions")
module.exports = AMAZON_HelpIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Du hast nach Hilfe gefragt. ';

        // let previousIntent = getPreviousIntent(sessionAttributes);
        // if (previousIntent && !handlerInput.requestEnvelope.session.new) {
        //     say += 'Your last intent was ' + previousIntent + '. ';
        // }
        // say +=  'I understand  ' + intents.length + ' intents, '

        say += ' Hier ist etwas was du mich fragen kannst: <break time="1s"/>' + getSampleUtterance(sampleQuestions);

        return responseBuilder
            .speak(say)
            .getResponse();
    },
};
