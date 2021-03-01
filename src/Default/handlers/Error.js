module.exports = ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;
        console.log(`Error handled: ${error.message}`);
        console.error(error)

        return handlerInput.responseBuilder
            .speak('Es ist ein Fehler aufgetreten, bitte versuchen Sie Ihre Anfrage nochmal später.')
            .withShouldEndSession(true)
            .getResponse();
    }
};
