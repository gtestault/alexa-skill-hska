const invocationName = "hochschule karlsruhe";
const {capitalize} = require("../utils/HelperFunctions")

module.exports = LaunchRequest_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Hallo, willkommen zu der ' + invocationName + ' Alexa-App. Sage Hilfe um Funktionen zu entdecken.';

        let skillTitle = capitalize(invocationName);


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};
