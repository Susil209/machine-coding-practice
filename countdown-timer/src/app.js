// IIFE

(function () {
  // get hour,min and sec
  let hour = document.querySelector(".hour");
  let minute = document.querySelector(".minute");
  let sec = document.querySelector(".sec");

  // get all buttons
  let startBtn = document.querySelector(".start");
  let stopBtn = document.querySelector(".stop");
  let resetBtn = document.querySelector(".reset");

  let countDownTimer = null;

  // Start the timer - START
  // adding event listener on start btn
  startBtn.addEventListener("click", function () {
    console.log("Start")
    // console.log(typeof(hourVal))
    if (hour.value == 0 && minute.value == 0 && sec.value == 0) return;

    // else start timer
    function startInterval() {
      // show stop btn and hide start btn
      startBtn.style.display = "none";
      stopBtn.style.display = "initial";

      // set timer function will call for every 1000ms = 1sec interval
      countDownTimer = setInterval(() => {
        timer();
      }, 1000);
    }
    // call startInterval
    startInterval();
  });
  // Start Timer Button - END

  // timer function
  function timer() {
    //format input
    // when sec value exceeds, sec = 62 => min=1,sec=3
    if (sec.value > 60) {
      minute.value++;
      sec.value = parseInt(sec.value, 10) - 59;
    }

    // when min value exceeds, min = 62 => hour=1,min=2
    if (minute.value > 60) {
      hour.value++;
      minute.value = parseInt(minute.value, 10) - 60;
    }

    // if hour,min and sec are 0 then stop interval
    if (hour.value == 0 && minute.value == 0 && sec.value == 0) {
      hour.value = "";
      minute.value = "";
      sec.value = "";
      stopInterval();
    } else if (sec.value != 0) {
      // if sec value is not 0
      // if sec value is less than 10 append 0
      sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`;
    }

    // if minute is not 0 but sec is 0
    else if (minute.value != 0 && sec.value == 0) {
      // set sec to 59
      sec.value = 59;
      minute.value = `${minute.value <= 10 ? "0" : ""}${minute.value - 1}`;
    }

    // if hour is not 0 but minute is 0
    else if (hour.value != 0 && minute.value == 0) {
      // set minute to 60 miutes
      minute.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }
  }

  // Stop Interval Logic - START
  function stopInterval(state) {
    // if state = pause then continue else start
    startBtn.innerHTML = state === 'pause' ? 'Continue' : 'Start';

    // show start button
    startBtn.style.display = 'initial';
    stopBtn.style.display = 'none';

    // clear interval
    clearInterval(countDownTimer);
  }

    // Stop Timer Button - START
  stopBtn.addEventListener('click', function() {
    console.log("Stop")
    stopInterval('pause');
  })
  // Stop Timer Button - END

  // Reset Timer Button - START
  resetBtn.addEventListener("click", function () {
    console.log("Reset")
    hour.value = "";
    minute.value = "";
    sec.value = "";

    stopInterval();
  });
  // Reset Timer Button - END
})();
