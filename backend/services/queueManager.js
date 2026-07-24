const meetingQueue = [];

function addMeeting(meeting) {
  meetingQueue.push(meeting);
}

function getNextMeeting() {
  return meetingQueue.shift();
}

function hasMeetings() {
  return meetingQueue.length > 0;
}

function getQueueLength() {
  return meetingQueue.length;
}

module.exports = {
  addMeeting,
  getNextMeeting,
  hasMeetings,
  getQueueLength
};