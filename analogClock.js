/* ------ Clock Time Display ------ */
let lastSecondsDegrees = 90; // Initialize with the starting position of the second hand
let lastMinutesDegrees = 90; // Initialize with the starting position of the minute hand
let lastHoursDegrees = 90;   // Initialize with the starting position of the hour hand

function setClock() {
    const now = new Date();

    const seconds = now.getSeconds() + now.getMilliseconds() / 1000; // Seconds with milliseconds
    const secondsDegrees = (seconds / 60) * 360 + 90; // Seconds rotation
    
    const minutes = now.getMinutes() + seconds / 60; // Minutes with seconds
    const minutesDegrees = (minutes / 60) * 360 + 90;

    const hours = now.getHours() % 12 + minutes / 60; // Hours and minutes, modulo 12 for 12-hour format
    const hoursDegrees = (hours / 12) * 360 + 90;

    // Hand elements
    const secondHand = document.querySelector('.second-hand');
    const minHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    // Fix jump for seconds hand
    if (secondsDegrees < lastSecondsDegrees) {
        secondHand.style.transition = "none"; // Disable transition for instant reset
    } else {
        secondHand.style.transition = "transform 0.05s ease-in-out"; // Enable smooth transition
    }
    lastSecondsDegrees = secondsDegrees;

    // Fix jump for minutes hand
    if (minutesDegrees < lastMinutesDegrees) {
        minHand.style.transition = "none"; // Disable transition for instant reset
    } else {
        minHand.style.transition = "transform 0.05s ease-in-out"; // Enable smooth transition
    }
    lastMinutesDegrees = minutesDegrees;

    // Fix jump for hours hand
    if (hoursDegrees < lastHoursDegrees) {
        hourHand.style.transition = "none"; // Disable transition for instant reset
    } else {
        hourHand.style.transition = "transform 0.05s ease-in-out"; // Enable smooth transition
    }
    lastHoursDegrees = hoursDegrees;

    // Apply smooth rotation
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}
  
// Loop in function for a smooth transition
function startClock() {
    setClock();
    requestAnimationFrame(startClock);
}

// Start animation
startClock();


/* ------ Center Dot ------ */

const centralDot = document.createElement('div');
centralDot.classList.add('central-dot'); // Add a class to the dot

// Add the dot to the website
document.querySelector('.clock').appendChild(centralDot);


/* ------ Add Date to Clock ------ */

function additionalInformation() {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    if (month < 9) {
        month = "0" + month;
    }

    const bottomDisplay = `${day}/${month}/${year}`;

    const element = document.querySelector(".clock");
    const date = document.createElement("p");
    date.classList.add('info');
    date.textContent = bottomDisplay;
    element.appendChild(date);


}

additionalInformation();