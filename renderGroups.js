function renderGroups(groups, timers) {
  groups.forEach(group => renderSingleGroup(group));
}

function renderSingleGroup(group) {
  let groupDiv = document.createElement("div");
  groupDiv.classList = "group card ";
  groupDiv.id = group.id;
  groupDiv.setAttribute(
    "style",
    `position:absolute; top: ${group.top}px;left:${group.left}px; width: ${group.width}px; height: ${group.height}px;`
  );
  let groupHeader = document.createElement("div");
  groupHeader.setAttribute(
    "class",
    "card-header d-flex bg-dark p-0 d-inline-block"
  );
  groupHeader.innerHTML = `<h6 class='p-1 mb-0 text-white mr-auto groupHeading' ondblclick="editGroupLabel('${group.id}')" >
    <span><i class="fa fa-bars mx-1" aria-hidden="true"></i>${group.label}</span></h6>
    <input type='text' name='groupLabel' class='d-none p-1 mb-0 bg-dark text-white mr-auto' onblur="updateGroupLabel('${group.id}')" value='${group.label}'/>
    <button class='rounded btn p-1' onClick="deleteGroup('${group.id}')"><i class='fa fa-trash'></i></button>
    <button class='rounded btn p-1' onClick="createGroupNextTo('${group.id}')"><i class='fa fa-plus-square'></i></button>`;
  groupDiv.appendChild(groupHeader);

  let timersList = document.createElement("div");
  timersList.classList = "timersList d-flex flex-wrap";
  groupDiv.appendChild(timersList);
  group.timers.forEach(timerId => {
    timersList.appendChild(getTimerDiv(timerId, group.id));
  });

  timersList.appendChild(getPlaceholderDiv(group.id));
  $(".container .row").append(groupDiv);

  // let newHeight = getGroupHeight($("#" + group.id));
}

function getPlaceholderDiv(groupId) {
  let placeholder = document.createElement("div");
  placeholder.className =
    "p-0 timerContainer d-flex justify-content-center align-items-center   ";
  placeholder.id = "placeholder";
  placeholder.innerHTML = `<p class="timer roundedp-3">
                <button class="addTimer btn btn-info btn-sm rounded-pill" onClick="addTimer('${groupId}')" ><i class="fa fa-plus"></i> Add Timer</button>
              </p>`;
  return placeholder;
}

function getTimerDiv(timerId, groupId) {
  let timerContainer = document.createElement("div");
  timerContainer.classList = "p-1 timerContainer ";
  let timer = timers.find(t => t.id === timerId);

  let timerDiv = document.createElement("div");
  timerDiv.id = timer.id;
  timerDiv.classList = "timer d-flex m-0 rounded border border-dark";
  let actionButtonSrc = "fa fa-pause fa-2x";
  if (timer.status == "paused") actionButtonSrc = "fa fa-play fa-2x";
  let d = new Date();
  let timeForLabel = "00:00:00";
  let totalSecondsInMillis = parseInt(timer.totalSeconds) * 1000;

  if (timer.status === "paused") {
    timeForLabel = parseMillisecondsIntoReadableTime(totalSecondsInMillis);
  } else {
    let elasspedTime = Math.floor(d.getTime() - parseInt(timer.startedAt));

    if (elasspedTime < totalSecondsInMillis) {
      timeForLabel = parseMillisecondsIntoReadableTime(
        totalSecondsInMillis - elasspedTime
      );
    } else {
      actionButtonSrc = "fa fa-play fa-2x";
      timer.status = "finished";
    }
  }
  let duration = parseMillisecondsIntoReadableTime(timer.duration * 1000);
  let innerHTML = `
                <div class='d-flex flex-column ml-auto mr-auto '>
                    <p class='mb-0 p-0 m-0 label'><strong>${timer.label}</strong></p>
                    <label class="remainingTime p-0 m-0 font-weight-bold text-white mb-0" id=${timer.status}>${timeForLabel}</label>
                    <label class='mb-0 duration'>Duration: ${duration}</label>
                </div>
                <div>
                <div class=' d-flex rounded bg-secondary mb-1'>
  <button class='btn p-0 m-0 mr-1 ' onClick="deleteTimer(${timer.id},'${groupId}')"><i class='fa fa-trash'></i></button>
  <button class='btn p-0 m-0 rounded-circle' onClick="editTimer(${timer.id},'${groupId}')"><i class='fa fa-cog'></i></button>
  </div>
  <button class='rounded-circle btn p-0 px-2 actionBtn' onClick="play(${timer.id})"><i class='${actionButtonSrc}'></i></button></div>`;
  timerDiv.innerHTML = innerHTML;
  // return timerDiv;
  timerContainer.append(timerDiv);
  return timerContainer;
}

function play(id) {
  let status = "";
  timers.map(t => {
    if (t.id == id) {
      if (t.status === "paused") {
        let d = new Date();
        t.startedAt = d.getTime();
        t.status = "running";
        $(".group .timersList #" + id)
          .find(".actionBtn i")
          .attr("class", "fa fa-pause fa-2x ");
      } else if (t.status === "running") {
        $(".group .timersList #" + id)
          .find(".actionBtn i")
          .attr("class", "fa fa-play fa-2x ");
        let time = getRemainingSecondsOf(id);
        t.totalSeconds = time;
        t.status = "paused";
      }
      console.log(t);
      status = t.status;
    }
    return t;
  });

  $(".group .timersList #" + id)
    .find(".remainingTime")
    .attr("id", status);
}

function getRemainingSecondsOf(timerId) {
  let remainingTime = $(".group .timersList #" + timerId).find(
    ".remainingTime"
  )[0].innerHTML;
  return convertToSeconds(remainingTime);
}
