function checkOverLapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function isOverlap(event, ui) {
  let draggedGroup = ui.helper[0];
  let draggedRect = draggedGroup.getBoundingClientRect();
  let draggedId = draggedGroup.id;
  let allRects = document.getElementsByClassName("group");
  for (let index = 0; index < allRects.length; index++) {
    const id = allRects[index].id;
    if (id == draggedId) continue;
    const rect = allRects[index].getBoundingClientRect();
    if (checkOverLapping(rect, draggedRect)) return true;
  }
  return false;
}
function getGroupHeight(group) {
  return (
    group.find(".card-header").outerHeight() +
    group.find(".timersList").outerHeight()
  );
}

function getGroupWidth(event, ui) {
  // let oldWidth = +ui.originalSize.width;
  let newWidth = +ui.size.width;
  let noOfTimers = Math.floor(newWidth / timerWidth);
  return noOfTimers * timerWidth + 10;
}

function getMaxWidth(event, ui) {
  let childs = $("#" + ui.element[0].id)
    .find(".timersList")
    .children()
    .size();
  let width = childs * timerWidth + 18;
  return width;
}

function parseMillisecondsIntoReadableTime(milliseconds) {
  //Get hours from milliseconds
  var hours = milliseconds / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

  return h + ":" + m + ":" + s;
}

function decrement(time) {
  let timeArr = time.split(":");
  let seconds = parseInt(timeArr[2]);
  let minutes = parseInt(timeArr[1]);
  let hours = parseInt(timeArr[0]);

  if (seconds <= 0) {
    if (minutes > 0) {
      minutes--;
      seconds = 59;
    }
    if (minutes <= 0) {
      if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      }
    }
  } else {
    seconds--;
  }
  return to2digits(hours) + ":" + to2digits(minutes) + ":" + to2digits(seconds);
}

function to2digits(n) {
  if (n > 9) return n;
  return "0" + n;
}

function convertToSeconds(time) {
  let timeArr = time.split(":");
  let seconds = parseInt(timeArr[2]);
  let minutes = parseInt(timeArr[1]);
  let hours = parseInt(timeArr[0]);
  return hours * 3600 + minutes * 60 + seconds;
}
function clearFields() {
  $("form")
    .find("input")
    .val("");
}
