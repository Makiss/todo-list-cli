#!/usr/bin/env node
const EventEmitter = require('events');

const commandsEnum = require('./enums').commands;
const DBConnection = require('./DBConnection');
const TaskViewModel = require('./task/TaskViewModel');
const TaskView = require('./task/TaskView');
const TaskModel = require('./task/TaskModel');

const commandName = process.argv[2];
const emitter = new EventEmitter();

const db = new DBConnection(emitter);
const taskView = new TaskView(emitter);
const taskModel = new TaskModel(db, emitter);
const taskManager = new TaskViewModel(taskView, taskModel);

if (!commandName) {
  console.log("Please enter a valid command. Use 'help' to learn more.");
  process.exit();
}

switch (commandsEnum[commandName.toUpperCase()]) {
  case 'NEW':
    taskManager.newTask();
    break;
  case 'GET':
    taskManager.tasks();
    break;
  case 'COMPLETE':
    taskManager.completeTask();
    break;
  case 'HELP':
    taskManager.help();
    break;
  default:
    console.log("Please enter a valid command. Use 'help' to learn more.");
    process.exit();
}
