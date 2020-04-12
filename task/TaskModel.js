class TaskModel {
  constructor(db, emitter) {
    this._db = db;
    this._emitter = emitter;
  }

  deleteTask = (taskName) => {
    this.getTasks();
    this._emitter.on('tasks', (tasks) => {
      const parsedTasks = JSON.parse(tasks);
      const taskIndex = parsedTasks.findIndex((task) => task === taskName);
      if (taskIndex >= 0) {
        const filteredTasks = parsedTasks.filter(
          (taskName, index) => index !== taskIndex
        );

        this._db.setTasks(filteredTasks);
      } else {
        this._emitter.emit('noTask');
      }
    });
  };

  addTask = (taskName) => {
    this.getTasks();
    this._emitter.on('tasks', (tasks) => {
      const parsedTasks = JSON.parse(tasks);
      const taskIndex = parsedTasks.findIndex((task) => task.name === taskName);
      if (taskIndex === -1) {
        const newTasks = parsedTasks.concat(taskName);

        this._db.setTasks(newTasks);
      } else {
        this._emitter.emit('taskDublicate');
      }
    });
  };

  getTasks = () => {
    this._db.getTasks();
  };
}

module.exports = TaskModel;
