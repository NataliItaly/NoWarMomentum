export function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  showDate();
  setWarDays();
  setTimeout(showTime, 1000);
  return currentTime;
}

export function showDate() {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };

  return date.toLocaleDateString('en-Br', options);
}

export function setWarDays() {
  let todayDay = new Date();
  let timeToday = todayDay.getTime();
  let warDay = new Date(2022, 1, 24);
  let timeWar = warDay.getTime();
  let diffWarToday = timeToday - timeWar;
  let realDiff = Math.ceil(diffWarToday / (1000 * 60 * 60 * 24));

  return `the ${realDiff}nth`;
}
