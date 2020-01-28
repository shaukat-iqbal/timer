var timerWidth = 250;
var timerHeight = 100;
var groupHeaderHeight = 28;
var timers = [
  {
    id: 0,
    label: "Timer 0",
    startedAt: "1570657522991",
    duration: "300000",
    totalSeconds: "300000",
    status: "paused"
  },
  {
    id: 1,
    label: "Timer 1",
    startedAt: "1570657522991",
    duration: "300000",
    totalSeconds: "300000",
    status: "paused"
  }
];

var groups = [
  {
    id: "g0",
    label: "Group 0",
    top: 200,
    left: 800,
    width: 250,
    height: 230,
    timers: [0]
  },
  {
    id: "g1",
    label: "Group 1",
    top: 200,
    left: 200,
    width: 250,
    height: 230,
    timers: [1]
  }
];
