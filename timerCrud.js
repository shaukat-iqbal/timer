function editTimer(timerId, groupId) {
  let timer = timers.find(t => t.id == timerId);
  console.log(timer);
  $("form input[name='groupId']").attr("value", groupId);
  $("form input[name='timerId']").attr("value", timerId);
  $("form input[name='type']").attr("value", "edit");
  $("form input[name='label']").val(timer.label);
  let timeArr = parseMillisecondsIntoReadableTime(timer.duration * 1000).split(
    ":"
  );
  $("form input[name='hours']").val(parseInt(timeArr[0]));
  $("form input[name='minutes']").val(parseInt(timeArr[1]));
  $("form input[name='seconds']").val(parseInt(timeArr[2]));
  $("#addTimerModal").modal({ backdrop: true });
}

function addTimer(groupId) {
  let d = new Date();
  console.log(d.getTime());
  clearFields();
  $("#addTimerModal").modal({ backdrop: true });
  $("form input[name='groupId']").val(groupId);
  $("form input[name='type']").val("add");
}

function updateTimer(timerId, label, duration) {
  let timer = timers.find(t => t.id == timerId);
  let olderDuration = +timer.duration;
  let diff = olderDuration - duration;

  //call backend
  let remaining = getRemainingSecondsOf(timerId);
  let newRemaining = remaining - diff;
  if (newRemaining < 0) {
    newRemaining = 0;
    timer.status = "finished";
  }
  if (timer) {
    timer.duration = duration;
    timer.label = label;
    timer.totalSeconds = newRemaining;
  }

  let timerLabel = $("#" + timerId).find(".remainingTime");
  timerLabel.html(parseMillisecondsIntoReadableTime(newRemaining * 1000));
  timerLabel.attr("id", timer.status);
  $("#" + timerId)
    .find(".duration")
    .html("Duration: " + parseMillisecondsIntoReadableTime(duration * 1000));

  $("#addTimerModal").modal("hide");
}

function deleteTimer(timerId, groupId) {
  let timer = timers.find(t => t.id == timerId);
  if(!timer){alert("Timer Not valid"); return;};
  if (confirm("Do you want to delete the Timer:" + timer.label)) {
    let group = groups.find(g => g.id == groupId);
    group.timers = group.timers.filter(t => t != timerId);
    console.log(group.timers);
    timers = timers.filter(t => t.id != timerId);
    $("#" + timerId)
      .parent(".timerContainer")
      .remove();
    let groupDiv = $("#" + groupId);
    groupDiv.css("height", getGroupHeight(groupDiv));
  }
}
