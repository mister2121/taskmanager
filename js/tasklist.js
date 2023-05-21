$(document).ready(function() {
  var taskList = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [];

  function addTaskToList(task, dueDate) {
    $('#taskList').append('<li class="list-group-item">' + task + '<span class="due-date">' + dueDate + '</span><div class="button-wrapper"><button type="button" class="btn btn-sm btn-outline-success float-right doneBtn">Done</button><button type="button" class="btn btn-sm btn-outline-primary float-right editBtn">Edit</button><button type="button" class="btn btn-sm btn-outline-danger float-right mr-2 deleteBtn">Delete</button></div></li>');
  }

  // Add Task Modal
  $('#addTaskBtn').click(function() {
    var taskInput = $('#taskInput').val();
    var dueDateInput = $('#dueDateInput').val();
    if(taskInput != '') {
      taskList.push({task: taskInput, dueDate: dueDateInput});
      localStorage.setItem('taskList', JSON.stringify(taskList)); // store updated task list in local storage
      $('#addTaskModal').modal('hide');
      addTaskToList(taskInput, dueDateInput);
      $('#taskInput').val('');
      $('#dueDateInput').val('');
    }
  });

  // Edit Task Modal
  $(document).on('click', '.editBtn', function() {
    var index = $(this).parent().index();
    var task = taskList[index].task;
    var dueDate = taskList[index].dueDate;
    $('#editTaskInput').val(task);
    $('#editDueDateInput').val(dueDate);
    $('#editTaskModal').modal('show');
    $('#saveTaskBtn').click(function() {
      var newTask = $('#editTaskInput').val();
      var newDueDate = $('#editDueDateInput').val();
      if(newTask != '') {
        taskList[index].task = newTask;
        taskList[index].dueDate = newDueDate;
        localStorage.setItem('taskList', JSON.stringify(taskList)); // store updated task list in local storage
        $('#editTaskModal').modal('hide');
        $('#taskList li').eq(index).html('<span class="task-name">' + newTask + '</span>' + '<span class="due-date">' + newDueDate + '</span><div class="button-wrapper"><button type="button" class="btn btn-sm btn-outline-success float-right doneBtn">Done</button><button type="button" class="btn btn-sm btn-outline-primary float-right editBtn">Edit</button><button type="button" class="btn btn-sm btn-outline-danger float-right mr-2 deleteBtn">Delete</button></div>');
      }
    });
  });

  // Delete Task
  $(document).on('click', '.deleteBtn', function() {
    var index = $(this).parent().index();
    taskList.splice(index, 1); // remove task from taskList array
    localStorage.setItem('taskList', JSON.stringify(taskList)); // store updated task list in local storage
    $(this).closest('li').remove(); // remove corresponding HTML element from DOM
  });

  // Done Button
  $(document).on('click', '.doneBtn', function() {
    var index = $(this).parent().parent().index();
    var listItem = $('#taskList li').eq(index);
    if(listItem.hasClass('list-group-item-success')) {
      listItem.removeClass('list-group-item-success');
      listItem.addClass('list-group-item-light');
      $(this).text('Done');
    } else {
      listItem.removeClass('list-group-item-light');
      listItem.addClass('list-group-item-success');
      $(this).text('Undone');
    }
  });

  // Load saved tasks
  for(var i = 0; i < taskList.length; i++) {
    addTaskToList(taskList[i].task, taskList[i].dueDate);
  }
});