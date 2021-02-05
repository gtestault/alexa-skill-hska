module.exports = ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Die Hochschule ist gerade beschäftigt, bitte versuchen Sie Ihre Anfrage nochmal später.')
            .reprompt('Die Hochschule ist gerade beschäftigt, bitte versuchen Sie Ihre Anfrage nochmal später.')
            .getResponse();
    }
};
