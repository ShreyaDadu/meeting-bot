const {
    getFreeWorker,
    occupyWorker
  } = require('./workerManager');
  
  const {
    getNextMeeting,
    hasMeetings
  } = require('./queueManager');
  
  function assignMeeting() {
  
    const worker = getFreeWorker();
  
    if (!worker) {
  
      console.log('No free workers.');
  
      return null;
  
    }
  
    if (!hasMeetings()) {
  
      console.log('Meeting queue empty.');
  
      return null;
  
    }
  
    const meeting = getNextMeeting();
  
    occupyWorker(worker.id);
  
    console.log(
      `Assigned ${worker.id} to queued meeting ${meeting.id}`
    );
  
    return {
      worker,
      meeting
    };
  
  }
  
  module.exports = {
    assignMeeting
  };