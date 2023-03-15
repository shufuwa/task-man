var checkboxes = document.getElementsByName('task_id');
var doneBtn = document.getElementById('batch-done-btn');
var deleteBtn = document.getElementById('batch-delete-btn');

document.addEventListener('DOMContentLoaded', function () {
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function () {
            var checkedBoxes = document.querySelectorAll('input[name=task_id]:checked');
            console.log(checkedBoxes, " ", checkedBoxes.length)
            if (checkedBoxes.length > 0) {
                doneBtn.style.display = 'inline-block';
                deleteBtn.style.display = 'inline-block';
            } else {
                doneBtn.style.display = 'none';
                deleteBtn.style.display = 'none';
            }
        });
    }
});

document.getElementById('done-form').addEventListener('submit', function () {
    var taskIds = '';
    var checkboxes = document.getElementsByName('task_id');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            taskIds += checkboxes[i].value + 'a';
        }
    }
    taskIds = taskIds.slice(0, -1);  // remove last a
    if (taskIds.length != 0) {
        url = url_done.replace('__task_ids__', taskIds);
        this.action = url;
    }
    else {
        event.preventDefault();
    }
});

document.getElementById('delete-form').addEventListener('submit', function () {
    var taskIds = '';
    var checkboxes = document.getElementsByName('task_id');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            taskIds += checkboxes[i].value + 'a';
        }
    }
    taskIds = taskIds.slice(0, -1);  // remove last a
    if (taskIds.length != 0) {
        var url = url_del.replace('__task_ids__', taskIds);
        this.action = url;
    }
    else {
        event.preventDefault();
    }
});
