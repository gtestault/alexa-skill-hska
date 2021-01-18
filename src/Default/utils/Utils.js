module.exports = {
    convertValueToHour(value) {
        let temp = (value / 60).toString()
        if (temp.includes(".")) {
            console.log("uhrzeit: " + temp)
            let convertedHour = temp.substring(0, temp.indexOf("."))
            let convertedMinute = value % 60
            if (convertedMinute.toString().length == 1) {
                convertedMinute = "0" + convertedMinute;
            }
            return convertedHour + ":" + convertedMinute + " Uhr";
        } else {
            return temp + ":00 Uhr";
        }
    },

    convertValueToDay(value) {
        if (value == 0) {
            return "Montag";
        } else if (value == 1) {
            return "Dienstag";
        } else if (value == 2) {
            return "Mittwoch";
        } else if (value == 3) {
            return "Donnerstag";
        } else if (value == 4) {
            return "Freitag";
        } else if (value == 5) {
            return "Samstag";
        } else if (value == 6) {
            return "Sonntag";
        } else {
            return "-1";
        }
    },

    //only check required slot types with this function
    isSlotTypeValid(slotType) {
        let authority = slotType.resolutions.resolutionsPerAuthority;
        for (let res in authority) {
            if (authority[res].status.code !== "ER_SUCCESS_MATCH") {
                return false;
            }
            return true;
        }
    },

    validateResponseOnSpecialChars(responseSpeech) {
        let response = responseSpeech.replace(/&/g, " und ");
        return response;
    }
}