const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let interval;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (secondsCount) => {
    let { hours, minutes, seconds } = getTimePoints(secondsCount)
    const {formatSeconds, formatMinutes, formatHours} = getTimePointsValidFormat(hours, minutes, seconds)
    setTimerInnerHtml(formatSeconds, formatMinutes, formatHours)
    clearInterval(interval)

    interval = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0 && minutes <= 0 && hours <= 0) {
        seconds = minutes = hours = 0;
        clearInterval(interval)
      } else if (seconds < 0 && minutes > 0 && hours > 0) {
        seconds = 59;
        minutes -= 1;
      } else if (seconds <= 0 && minutes <= 0 && hours > 0) {
        seconds = 59;
        minutes = 59;
        hours -= 1
      } else if (seconds < 0 && minutes > 0 && hours <= 0) {
        seconds = 59
        minutes -= 1
      }
      const {formatSeconds, formatMinutes, formatHours} = getTimePointsValidFormat(hours, minutes, seconds)
      setTimerInnerHtml(formatSeconds, formatMinutes, formatHours)
    }, 1000)
  };
};

const animateTimer = createTimerAnimator()

inputEl.addEventListener('input', event => {
  const clearValue = event.target.value.match(/\d/g)?.join('')
  event.target.value = clearValue || ''
  // Очистите input так, чтобы в значении
  // оставались только числа
});

buttonEl.addEventListener('click', () => {
  const secondsCount = Number(inputEl.value);

  animateTimer(secondsCount);

  inputEl.value = '';
});


function getTimePoints(seconds) {
  let hours = Math.floor(seconds / 3600)
  seconds = seconds - (hours * 3600)
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (minutes * 60)

  console.log(seconds, minutes, hours);

  return { hours, minutes, seconds }
}

function getTimePointsValidFormat(hours, minutes, seconds) {
  formatHours = hours < 10 ? `0${hours}` : hours;
  formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  formatSeconds = seconds < 10 ? `0${seconds}` : seconds

  return {
    formatHours,
    formatMinutes,
    formatSeconds
  }
}

function setTimerInnerHtml(seconds, minutes, hours) {
  timerEl.innerHTML = `${hours}:${minutes}:${seconds}`
}