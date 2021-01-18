const Alexa = require("ask-sdk");
const https = require("https");
const {CanteenIntentHandler, VegiCanteenIntentHandler} = require("./Features/Canteen/CanteenIntent")
const OpeningHoursIntent = require("./Features/OpeningHours/OpeningHoursIntent")
const BuildingOpenedIntent = require("./Features/OpeningHours/OpeningHoursIntent")
//const NewsIntent = require("./Features/News/NewsIntent")
const PersonIntent = require("./Features/Person/PersonIntent")
const ScheduleNextIntent = require("./Features/Schedule/ScheduleNextIntent")
const ScheduleTimeIntent = require("./Features/Schedule/ScheduleTimeIntent")
const ScheduleDateIntent = require("./Features/Schedule/ScheduleDateIntent")
const ScheduleRoomIntent = require("./Features/Schedule/ScheduleRoomIntent")
const ScheduleLecturerIntent = require("./Features/Schedule/ScheduleLecturerIntent")
const ScheduleLecturesIntent = require("./Features/Schedule/ScheduleLecturesIntent")
const LibraryIntent = require("./Features/Library/LibraryIntent")
const LibraryPlaceIntent = require("./Features/Library/LibraryPlaceIntent")

// default intents
const CancelIntent = require("./Default/intents/Cancel")
const HelpIntent = require("./Default/intents/Help")
const NavigateHomeIntent = require("./Default/intents/NavigateHome")
const StopIntent = require("./Default/intents/Stop")
const FallbackIntent = require("./Default/intents/Fallback")

// news intents
const {StartedInProgressNewsIntentHandler, ListNewsIntentHandler, NewsIntentHandler} = require("./Features/News/NewsIntent")

// default handlers
const LaunchRequest = require("./Default/handlers/LaunchRequest")
const ErrorHandler = require("./Default/handlers/Error")
const SessionEnded = require("./Default/handlers/SessionEnded")

//default interceptors
const InitMemoryAttributesInterceptor = require("./Default/interceptors/InitMemoryAttributes")
const RequestHistoryInterceptor = require("./Default/interceptors/RequestHistory")

const SERVER_PORT = 8000

const APP_ID = undefined;  // TODO replace with your Skill ID (OPTIONAL).


// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
const customSkill = skillBuilder
    .addRequestHandlers(
        CancelIntent,
        FallbackIntent,
        HelpIntent,
        NavigateHomeIntent,
        LaunchRequest,
        SessionEnded,
        //custom intents,
        OpeningHoursIntent,
        BuildingOpenedIntent,
        PersonIntent,
        //news intents
        NewsIntentHandler,
        ListNewsIntentHandler,
        StartedInProgressNewsIntentHandler,
        CanteenIntentHandler,
        VegiCanteenIntentHandler,
        ScheduleTimeIntent,
        ScheduleDateIntent,
        ScheduleRoomIntent,
        ScheduleNextIntent,
        ScheduleLecturerIntent,
        ScheduleLecturesIntent,
        NewsIntent,
        LibraryIntent,
        PersonIntent,
        LibraryPlaceIntent,
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(InitMemoryAttributesInterceptor)
    .addRequestInterceptors(RequestHistoryInterceptor)

    // .addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)

    // .addRequestInterceptors(RequestPersistenceInterceptor)
    // .addResponseInterceptors(ResponsePersistenceInterceptor)

    // .withTableName("askMemorySkillTable")
    // .withAutoCreateTable(true)

    .create();

const express = require('express');
const {ExpressAdapter} = require('ask-sdk-express-adapter');

const app = express();
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(customSkill, true, true);
app.post('/', adapter.getRequestHandlers());
console.log("Server listenting on port: " + SERVER_PORT)
app.listen(SERVER_PORT);
