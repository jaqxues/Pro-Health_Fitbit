import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { me } from "appbit";
import * as util from "../common/utils";
import userActivity from "user-activity";

if (!me.permissions.granted("access_activity")) {
    document.getElementById("screen1").style.display = "inline";
    document.getElementById("screen2").style.display = "none";
} else {
    loadScreen2();
}

/**
 * Wrapper and entry function to start displaying the watch as well as some of the collected data
 */
function loadScreen2() {
    const refreshRate = 3000;

    const discountIndicator = document.getElementById("discount-indicator");
    const primaryArc = document.getElementById("primary-arc");
    const clockElement = document.getElementById("clock-txt");
    const monthScoreEl = document.getElementById("month-score");

    const stepProgress = document.getElementById("steps-progress");
    const activeMinProgress = document.getElementById("activemin-progress");
    const distanceProgress = document.getElementById("distance-progress");
    const elevationGainProgress = document.getElementById("elevationgain-progress");

    const stepsCount = document.getElementById("steps-count");
    const activeMinCount = document.getElementById("activemin-count");
    const distanceCount = document.getElementById("distance-count");
    const elevationGainCount = document.getElementById("elevationgain-count");

    let showGoal = false;

// Update the clock every minute
    clock.granularity = "minutes";

// Update the <text> element every tick with the current time
    clock.ontick = (evt) => {
        let today = evt.date;
        let hours = today.getHours();
        if (preferences.clockDisplay === "12h") {
            // 12h format
            hours = hours % 12 || 12;
        } else {
            // 24h format
            hours = util.zeroPad(hours);
        }
        let mins = util.zeroPad(today.getMinutes());
        clockElement.text = `${hours}:${mins}`;
    };

    discountIndicator.onclick = animateAll;
    clockElement.onclick = animateAll;
    monthScoreEl.onclick = animateAll;

    function animateAll() {
        clockElement.animate("hallo");
        discountIndicator.animate("hallo");
        monthScoreEl.animate("hallo");
    }

    updateProgress();
    let updater = setInterval(updateProgress, refreshRate);

    /**
     * Function to update the Progress bars and circle indicators every 5 seconds
     * Includes Total Health Score, The "Steps" as well as "Active Minutes" progress indicators
     */
    function updateProgress() {
        primaryArc.sweepAngle = util.calcHealthScore() * 360;

        if (showGoal) {
            // stepsCount.text = userActivity.goals.adjusted["steps"] || 0;
            // activeMinCount.text = util.getActiveMinText(
            //     userActivity.goals.adjusted["activeMinutes"] || 0);
            // distanceCount.text = util.getDistanceText(
            //     userActivity.goals.adjusted["distance"] || 0);
            // elevationGainCount.text = util.getElevationGainText(
            //     userActivity.goals.adjusted["elevationGain"] || 0);
            stepsCount.text = userActivity.goals.steps || 0;
            activeMinCount.text = util.getActiveMinText(
                userActivity.goals.activeMinutes || 0);
            distanceCount.text = util.getDistanceText(
                userActivity.goals.distance || 0);
            elevationGainCount.text = util.getElevationGainText(
                userActivity.goals.elevationGain || 0);

        } else {

            stepProgress.text = (util.getStepProgress() * 100)
                .toFixed(0) + "%";
            activeMinProgress.text = (util.getActiveMinProgress() * 100)
                .toFixed(0) + "%";
            distanceProgress.text = (util.getDistanceProgress() * 100)
                .toFixed(0) + "%";
            elevationGainProgress.text = (util.getElevationGainProgress() * 100)
                .toFixed(0) + "%";

            stepsCount.text = userActivity.today.adjusted["steps"] || 0;
            activeMinCount.text = util.getActiveMinText(
                userActivity.today.adjusted["activeMinutes"] || 0);
            distanceCount.text = util.getDistanceText(
                userActivity.today.adjusted["distance"] || 0);
            elevationGainCount.text = util.getElevationGainText(
                userActivity.today.adjusted["elevationGain"] || 0);
        }
    }

    document.getElementById("counters-container").onclick = ((ev) => {
        showGoal = !showGoal;
        let newColor = showGoal ? "#777777" : "#0164A7";

        document.getElementsByClassName("counter-prim")
            .concat(document.getElementsByClassName("counter-sec"))
            .forEach((element) => {
                element.style.fill = newColor;
            });
        clearInterval(updater);
        updater = setInterval(updateProgress, showGoal ? 30000 : refreshRate);

        if (showGoal) {
            stepProgress.text = "Goal";
            activeMinProgress.text = "Goal";
            distanceProgress.text = "Goal";
            elevationGainProgress.text = "Goal";
        }
        updateProgress();
    });
}
