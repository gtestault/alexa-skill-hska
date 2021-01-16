const Alexa = require("ask-sdk");
const https = require("https");
const CanteenIntent = require("./Features/Canteen/CanteenIntent")
const NewsIntent = require("./Features/News/NewsIntent")
const LibraryIntent = require("./Features/Library/LibraryIntent")
const PersonIntent = require("./Features/Person/PersonIntent")
const ScheduleNextIntent = require("./Features/Schedule/ScheduleNextIntent")
const ScheduleTimeIntent = require("./Features/Schedule/ScheduleTimeIntent")
const ScheduleDateIntent = require("./Features/Schedule/ScheduleDateIntent")
const ScheduleRoomIntent = require("./Features/Schedule/ScheduleRoomIntent")
const ScheduleLecturerIntent = require("./Features/Schedule/ScheduleLecturerIntent")
const ScheduleLecturesIntent = require("./Features/Schedule/ScheduleLecturesIntent")

// default intents
const CancelIntent = require("./Default/intents/Cancel")
const HelpIntent = require("./Default/intents/Help")
const NavigateHomeIntent = require("./Default/intents/NavigateHome")
const StopIntent = require("./Default/intents/Stop")
const FallbackIntent = require("./Default/intents/Fallback")

// default handlers
const LaunchRequest = require("./Default/handlers/LaunchRequest")
const ErrorHandler = require("./Default/handlers/Error")
const SessionEnded = require("./Default/handlers/SessionEnded")

//default interceptors
const InitMemoryAttributesInterceptor = require("./Default/interceptors/InitMemoryAttributes")
const RequestHistoryInterceptor = require("./Default/interceptors/RequestHistory")

const SERVER_PORT = 8003

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
        CanteenIntent,
        ScheduleTimeIntent,
        ScheduleDateIntent,
        ScheduleRoomIntent,
        ScheduleNextIntent,
        ScheduleLecturerIntent,
        ScheduleLecturesIntent,
        NewsIntent,
        LibraryIntent,
        PersonIntent
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
const { ExpressAdapter } = require('ask-sdk-express-adapter');

const app = express();
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(customSkill, true, true);
app.post('/', adapter.getRequestHandlers());
console.log("Server listenting on port: " + SERVER_PORT)
app.listen(SERVER_PORT);
