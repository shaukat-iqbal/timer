function createGroupNextTo(groupId) {
  let left, top;
  if (!groupId) {
    groupId = groups.length + 1;
    left = 0;
    top = 50;
  } else {
    let refGroup = $("#" + groupId);
    left = refGroup.offset().left + refGroup.width();
    top = refGroup.offset().top;
  }

  let group = {
    id: `g${groups.length}`,
    height: timerHeight + groupHeaderHeight,
    width: timerWidth,
    left: left,
    top: top,
    timers: []
  };
  groups.push(group);
  renderSingleGroup(group);
  $("#" + group.id)
    .resizable(groupResizableOptions)
    .draggable(groupDraggableOptions);
}

function deleteGroup(groupId) {
  let group = groups.find(g => g.id == groupId);
  if (confirm("Do you want to delete the group:" + group.label)) {
    groups = groups.filter(g => g.id != groupId);
    $(`#${groupId}`).remove();
    console.log(groups);
  }
}

function updateGroupLabel(groupId) {
  let input = $(`#${groupId}`).find("input[name='groupLabel']");
  let val = input.val();
  group = groups.find(g => g.id == groupId);
  group.label = val;
  input.addClass("d-none");
  $(`#${groupId}`)
    .find(".groupHeading span")
    .html(`<i class="fa fa-bars mx-1" aria-hidden="true"></i>${group.label}`);
  $(`#${groupId}`)
    .find(".groupHeading")
    .removeClass("d-none");
  console.log(val, groups);
}

function editGroupLabel(groupId) {
  let groupDiv = $(`#${groupId}`);
  groupDiv.find(".groupHeading").addClass("d-none");
  let input = groupDiv.find("input[name='groupLabel']");
  input.removeClass("d-none");
  input.focus();
}
