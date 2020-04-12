class TaskViewModel {
  constructor(view, model) {
    this._view = view;
    this._model = model;
  }

  completeTask() {
    this._view.completeTask(this._model.deleteTask);
  }

  help() {
    this._view.getHelp();
  }

  newTask() {
    this._view.newTask(this._model.addTask);
  }

  tasks() {
    this._model.getTasks();
    this._view.tasks();
  }
}

module.exports = TaskViewModel;
