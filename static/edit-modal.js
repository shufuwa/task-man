// Retrieve the project order based on the selected project name and set it in the project order input
// var projectDropdown = document.getElementById("edit_project");
// var projectOrderInput = document.getElementById("edit_project_order");
// var projectOrder = '';
console.log("from edit-modal.js ", projects);

// projectDropdown.addEventListener("change", function () {
//     console.log("Drop down clicked")
//     var projectName = projectDropdown.value;
//     console.log(projectName)

//     // Loop through the projects array to find the matching project name and get its order
//     for (var i = 0; i < projects.length; i++) {
//         if (projects[i]["name"] === projectName) {
//             console.log(projects[i]["name"], "===", projectName, " ", i+1);
//             projectOrder = i+1;
//             break;
//         }
//     }

//     // If project name not found, set the project order to the next consecutive number
//     if (projectOrder === '') {
//         projectOrder = projects.length + 1;
//     }

//     // Set the project order in the project order input
//     projectOrderInput.value = projectOrder;
//     projectOrder--;
// });


// document.addEventListener('DOMContentLoaded', function () {
//     var titleText = document.getElementById("edit_title");
//     var taskOrderInput = document.getElementById("edit_task_order");
//     var taskOrder = '';

//     titleText.addEventListener("input", function () {
//         if (projects[projectOrder] != null) {
//             taskOrder = projects[projectOrder]["tasks"].length + 1;
//         }
//         else {
//             taskOrder = 1;
//         }

//         taskOrderInput.value = taskOrder;
//     });
// });






// Get the edit modal
var editModal = document.getElementById("edit-modal");

// Get the <span> element that closes the modal
var closeEditModal = document.getElementById("close-modal-btn-2");

// Select all edit links
let taskTab = document.getElementById("taskTable");
if (taskTab) {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("taskTable").addEventListener("click", function (event) {
            if (event.target.classList.contains("edit-link")) {
                // console.log("Edit link clicked:", event.target.getAttribute("data-task-id"));
                var taskId = event.target.getAttribute("data-task-id");

                // Make an Ajax request to get the task data from the database
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var task = JSON.parse(xhr.responseText);
                        // Fill in the form fields with the task data
                        document.getElementById("edit_task_id").value = task.id;
                        document.getElementById("edit_title").value = task.title;
                        document.getElementById("edit_task_order").value = task.task_order;
                        document.getElementById("edit_project").value = task.project;
                        document.getElementById("edit_project_order").value = task.project_order;

                        console.log(document.getElementById("edit_task_id").value, " ",
                            document.getElementById("edit_title").value = task.title, " ",
                            document.getElementById("edit_task_order").value = task.task_order, " ",
                            document.getElementById("edit_project").value = task.project, " ",
                            document.getElementById("edit_project_order").value = task.project_order)
                    }
                };
                xhr.open("POST", "/tasks/" + taskId, true);
                xhr.send();
            }
        });
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
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Reload the page to show the updated task list
            location.reload();
        }
    };
    var formData = new FormData(editForm);
    var task_id = document.getElementById("edit_task_id").value;
    console.log(formData);
    xhr.open("POST", "/edit_task/" + task_id, true);
    xhr.send(formData);
});

