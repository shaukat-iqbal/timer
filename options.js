let groupDraggableOptions = {
  cursor: "move",
  stop: function(event, ui) {
    if (isOverlap(event, ui)) {
      $(this).animate(ui.originalPosition, "slow");
      return;
    }
    let id = $(this).attr("id");
    let group = groups.find(g => g.id == id);
    let position = $(this).position();
    group.top = position["top"];
    group.left = position["left"];
  }
};
var groupResizableOptions = {
  handles: "se,e",
  ghost: true,
  autoHide: true,
  minWidth: timerWidth,
  stop: function(event, ui) {
    let groupId = $(this).attr("id");
    let group = groups.find(g => g.id == groupId);
    group.height = getGroupHeight($(ui.element));
    group.width = getGroupWidth(event, ui);
    $(this).css("height", group.height + "px");
    $(this).css("max-width", getMaxWidth(event, ui) + "px");
    $(this).css("width", group.width + "px");
    console.log(groups);
  }
};

var draggableOptions = {
  cancel: "#placeholder",
  cursor: "move",
  helper: "clone",
  snap: true,
  snapMode: "inner",
  snapTolerance: 32,
  revert: "invalid"
};
var droppableOptions = {
  hoverClass: "ui-state-highlight",
  over: function(event, ui) {
    //If the group is being dragged over then it should not show this highlight class
    if (
      $(ui.draggable).attr("id") &&
      $(ui.draggable)
        .attr("id")
        .match(/^g/)
    ) {
      $(this).removeClass("ui-state-highlight");
    }

    let targetParentId = $(this)
      .parents(".group")
      .attr("id");
    let draggedDivParentId = $(ui.draggable)
      .parents(".group")
      .attr("id");
    //not of same class
    if (targetParentId != draggedDivParentId) {
      if ($(this).attr("id") != "placeholder") {
        $(this).removeClass("ui-state-highlight");
      }
    }
  },

  drop: function(event, ui) {
    let droppedDiv = $(ui.draggable);
    //If the group div is dropped the just return
    if (droppedDiv.attr("id") && droppedDiv.attr("id").match(/^g/)) {
      return;
    }

    let droppedOnDiv = $(this);
    let droppedDivParent = droppedDiv.parents(".group");
    let droppedOnDivParentId = $(this)
      .parents(".group")
      .attr("id");

    let droppedDivParentId = $(ui.draggable)
      .parents(".group")
      .attr("id");

    var targetTimer = droppedOnDiv.children(), //original drop children
      draggedTimer = droppedDiv.children(); //original drag children

    // if target and dragged timer are not of same group
    if (droppedOnDivParentId != droppedDivParentId) {
      //if target is placeholder then append before otherwise revert
      if (droppedOnDiv.attr("id") == "placeholder") {
        $(ui.draggable).draggable({ revert: "invalid" });
        //apend before target div
        droppedOnDiv.before(droppedDiv);

        // Move the timer to target group
        let targetGroup = groups.find(g => g.id == droppedOnDivParentId);
        let group2 = groups.find(g => g.id == droppedDivParentId);

        targetGroup.timers.push(+draggedTimer.attr("id"));
        //remove the timer from previous group
        let indexToRemove = group2.timers.findIndex(
          t => t == draggedTimer.attr("id")
        );
        group2.timers.splice(indexToRemove, 1);
        let groupHeight = getGroupHeight($(this).parents(".group"));

        $(this)
          .parents(".group")
          .css("height", groupHeight);

        droppedDivParent.css("height", getGroupHeight(droppedDivParent));
      } else {
        $(ui.draggable).draggable({ revert: "valid" });
      }
    } else {
      //same group
      //stop exchanging placeholder and other div
      if (droppedOnDiv.attr("id") != "placeholder") {
        if (targetTimer.length > 0) {
          targetTimer.appendTo(droppedDiv);
        }
        draggedTimer.appendTo(droppedOnDiv);
        let group = groups.find(g => g.id === droppedDivParentId);
        timersList = group.timers;
        let a = timersList.findIndex(t => t == targetTimer.attr("id"));
        let b = timersList.findIndex(t => t == draggedTimer.attr("id"));
        let temp = timersList[a];
        timersList[a] = timersList[b];
        timersList[b] = temp;
        group.timers = timersList;
      }
      // console.log(timers.find(timer => timer == draggedTimer[0].id));
    }
  }
};
