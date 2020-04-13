const fs = require('fs');
const tasksFilePath = './task/list.json';

class DBConnection {
  constructor(emitter) {
    this._emitter = emitter;
  }

  getTasks() {
    if (!fs.existsSync(tasksFilePath)) {
      fs.writeFileSync(tasksFilePath, '[]');
    }

    fs.readFile(tasksFilePath, (err, tasks) => {
      if (err) {
        throw err;
      }

      this._emitter.emit('tasks', tasks);
    });
  }

  setTasks(tasks) {
    fs.writeFile(tasksFilePath, JSON.stringify(tasks), (err) => {
      if (err) {
        throw err;
      }

      this._emitter.emit('tasksCreated');
    });
  }
}

module.exports = DBConnection;
