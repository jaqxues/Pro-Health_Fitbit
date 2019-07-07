import userActivity from "user-activity";

// Add zero in front of numbers < 10
export function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

/**
 * Make sure to use toFixed(0) to display this information to the user
 *
 * @returns {number} The Step Progress (Steps / Goal) in a number from 0 to 1
 */
export function getStepProgress() {
    let stepProgress = (userActivity.today.adjusted["steps"] || 0) / userActivity.goals["steps"];
    if (stepProgress > 1) {
        return 1;
    }
    return stepProgress;
}


/**
 * Make sure to use toFixed(0) to display this information to the user
 *
 * @returns {number} The Step Progress (Steps / Goal) in a number from 0 to 1
 */
export function getActiveMinProgress() {
    let activeMinProgress = (userActivity.today.adjusted["activeMinutes"] || 0) / userActivity.goals["activeMinutes"];
    if (activeMinProgress > 1) {
        return 1;
    }
    return activeMinProgress;
}

/**
 * Make sure to use toFixed(0) to display this information to the user
 *
 * @returns {number} The Distance Progress (Distance / Goal) in a number from 0 to 1
 */
export function getDistanceProgress() {
    let distanceProgress = (userActivity.today.adjusted["distance"] || 0) / userActivity.goals["distance"];
    if (distanceProgress > 1) {
        return 1;
    }
    return distanceProgress;
}

export function getElevationGainProgress() {
    let elevationGainProgress = (userActivity.today.adjusted["elevationGain"] || 0) / userActivity.goals["elevationGain"];
    if (elevationGainProgress > 1) {
        return 1;
    }
    return elevationGainProgress;
}

export function getActiveMinText(activeMin) {
    let activeMinText = (Math.floor(activeMin / 60) === 0) ? "" : Math.floor(activeMin / 60) + "h ";
    activeMinText += activeMin % 60 + "min";
    return activeMinText;
}

export function getDistanceText(distance) {
    let distanceText = (Math.floor(distance / 1000) === 0) ? "" : Math.floor(distance / 1000) + "km ";
    distanceText += distance % 1000 + "m";
    return distanceText;
}

export function getElevationGainText(elevationGain) {
    return elevationGain + " floors";
}
