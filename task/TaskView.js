const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class TaskView {
  constructor(emitter) {
    this._emitter = emitter;
  }

  _renderTaskList(tasks) {
    return tasks
      .map((taskName, index) => `${index + 1}. ${taskName}`)
      .join('\n');
  }

  completeTask(deleteTask) {
    readlineInterface.question(
      'Please enter task name you want to complete.\n',
      (taskName) => {
        deleteTask(taskName);

        this._emitter.on('tasksCreated', () => {
          readlineInterface.write('Task completed successfully!');
          process.exit();
        });
        this._emitter.on('noTask', () => {
          readlineInterface.write('Task with such name does not exist.');
          process.exit();
        });
      }
    );
  }

  getHelp() {
    readlineInterface.write(
      `Usage: todo [command]\n
If you have not run 'npm run link' before the program call then you need to call it via 'node index [command]'\n
Commands:\n
get                      get uncompleted todo task list\n
new                      create todo task\n
complete                 complete todo task\n`
    );

    process.exit();
  }

  newTask(createTask) {
    readlineInterface.question('Please enter your task.\n', (taskName) => {
      createTask(taskName);

      this._emitter.on('tasksCreated', () => {
        readlineInterface.write('Task created successfully!');
        process.exit();
      });
      this._emitter.on('taskDublicate', () => {
        readlineInterface.write(
          'Choose another task name. Task with such name exists.'
        );
        process.exit();
      });
    });
  }

  tasks() {
    this._emitter.on('tasks', (tasks) => {
      const parsedTasks = JSON.parse(tasks);
      readlineInterface.write(
        parsedTasks.length > 0
          ? this._renderTaskList(parsedTasks)
          : 'There are no tasks to do.'
      );

      process.exit();
    });
  }
}

module.exports = TaskView;
