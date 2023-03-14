function showTasks() {
    document.getElementById("tasks-view").style.display = "block";
    document.getElementById("tasks-done-view").style.display = "none";
}

function showTasksDone() {
    document.getElementById("tasks-view").style.display = "none";
    document.getElementById("tasks-done-view").style.display = "block";
}

// // The provided code is adding event listeners to the "Done" and "Delete" buttons in a task list. 
// // When clicked, the JavaScript code retrieves the IDs of selected tasks by iterating over the checkboxes 
// // and concatenating the values into a string. If any tasks are selected, the form action is updated to include
// //  the IDs and the form is submitted. If no tasks are selected, the form submission is prevented.
// document.getElementById('done-form').addEventListener('submit', function () {
//     var taskIds = '';
//     var checkboxes = document.getElementsByName('task_id');
//     for (var i = 0; i < checkboxes.length; i++) {
//         if (checkboxes[i].checked) {
//             taskIds += checkboxes[i].value + 'a';
//         }
//     }
//     taskIds = taskIds.slice(0, -1);  // remove last a
//     if (taskIds.length != 0) {
//         var url = "{{ url_for('done_task', task_ids='__task_ids__') }}".replace('__task_ids__', taskIds);
//         this.action = url;
//     }
//     else {
//         event.preventDefault();
//     }
// });

// document.getElementById('delete-form').addEventListener('submit', function () {
//     var taskIds = '';
//     var checkboxes = document.getElementsByName('task_id');
//     for (var i = 0; i < checkboxes.length; i++) {
//         if (checkboxes[i].checked) {
//             taskIds += checkboxes[i].value + 'a';
//         }
//     }
//     taskIds = taskIds.slice(0, -1);  // remove last a
//     if (taskIds.length != 0) {
//         var url = "{{ url_for('delete_task', task_ids='__task_ids__') }}".replace('__task_ids__', taskIds);
//         this.action = url;
//     }
//     else {
//         event.preventDefault();
//     }
// });