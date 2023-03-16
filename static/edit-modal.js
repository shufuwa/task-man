console.log("from edit-modal.js ", projects);

// Get the edit modal
var editModal = document.getElementById("edit-modal");

// Get the <span> element that closes the modal
var closeEditModal = document.getElementById("close-modal-btn-2");

// Select all edit links
// document.addEventListener('DOMContentLoaded', function () {
//     let taskTab = document.getElementById("tasks-view");
//     // console.log(taskTab);
//     if (taskTab) {
//         // console.log("tasks-view exists");
//         taskTab.addEventListener("click", function (event) {
//             console.log(event);
//             if (event.target.classList.contains("feather-8-edit")) {
//                 console.log("Edit link clicked:", event.target.getAttribute("data-task-id"));
//                 var taskId = event.target.getAttribute("data-task-id");

//                 // Make a Fetch request to get the task data from the database
//                 fetch("/tasks/" + taskId, { method: "POST" })
//                     .then(function (response) {
//                         if (response.ok) {
//                             return response.json();
//                         } else {
//                             throw new Error("Network response was not ok.");
//                         }
//                     })
//                     .then(function (task) {
//                         // Fill in the form fields with the task data
//                         document.getElementById("edit_task_id").value = task.id;
//                         document.getElementById("edit_title").value = task.title;
//                         document.getElementById("edit_task_order").value = task.task_order;
//                         document.getElementById("edit_project").value = task.project;
//                         document.getElementById("edit_project_order").value = task.project_order;

//                         // log all the above variables
//                         console.log("edit_task_id: ", document.getElementById("edit_task_id").value);
//                         console.log("edit_title: ", document.getElementById("edit_title").value);
//                         console.log("edit_task_order: ", document.getElementById("edit_task_order").value);
//                         console.log("edit_project: ", document.getElementById("edit_project").value);
//                         console.log("edit_project_order: ", document.getElementById("edit_project_order").value);
//                     })
//                     .catch(function (error) {
//                         console.error("Error fetching task data:", error);
//                     });
//             }
//             else {
//                 console.log("feather-8-edit not found");
//             }

//         });
//     }
// });

function fetchTaskData(taskId) {
    // Make a Fetch request to get the task data from the database
    fetch("/tasks/" + taskId, { method: "POST" })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .then(function (task) {
            // Fill in the form fields with the task data
            document.getElementById("edit_task_id").value = task.id;
            document.getElementById("edit_title").value = task.title;
            document.getElementById("edit_task_order").value = task.task_order;
            document.getElementById("edit_project").value = task.project;
            document.getElementById("edit_project_order").value = task.project_order;

            // log all the above variables
            console.log("edit_task_id: ", document.getElementById("edit_task_id").value);
            console.log("edit_title: ", document.getElementById("edit_title").value);
            console.log("edit_task_order: ", document.getElementById("edit_task_order").value);
            console.log("edit_project: ", document.getElementById("edit_project").value);
            console.log("edit_project_order: ", document.getElementById("edit_project_order").value);
        })
        .catch(function (error) {
            console.error("Error fetching task data:", error);
        });
}


// When the user clicks the close button, close the edit modal
closeEditModal.onclick = function () {
    editModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
}

// When the user submits the edit form, make an Ajax request to update the task data in the database
var editForm = document.getElementById("edit_task");
editForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(editForm);
    var task_id = document.getElementById("edit_task_id").value;
    fetch("/edit_task/" + task_id, {
        method: "POST",
        body: formData
    })
    .then(function (response) {
        if (response.ok) {
            // Reload the page to show the updated task list
            location.reload();
        } else {
            throw new Error("Network response was not ok.");
        }
    })
    .catch(function (error) {
        console.error("Error updating task:", error);
    });
});


