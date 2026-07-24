const workers = [
  {
    id: 'worker-1',
    busy: false
  },
  {
    id: 'worker-2',
    busy: false
  },
  {
    id: 'worker-3',
    busy: false
  }
];
  
  function getFreeWorker() {
  
    return workers.find(
      worker => !worker.busy
    );
  
  }
  
  function occupyWorker(workerId) {
  
    const worker = workers.find(
      w => w.id === workerId
    );
  
    if (worker) {
  
      worker.busy = true;
  
    }
  
  }
  
  function releaseWorker(workerId) {
  
    const worker = workers.find(
      w => w.id === workerId
    );
  
    if (worker) {
  
      worker.busy = false;
  
    }
  
  }
  
  module.exports = {
    getFreeWorker,
    occupyWorker,
    releaseWorker
  };