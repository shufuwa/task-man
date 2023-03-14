// Retrieve the project order based on the selected project name and set it in the project order input
var projectDropdownAdd = document.getElementById("project");
var projectOrderInputAdd = document.getElementById("project_order");
var projectOrder = '';
console.log("from modal.js ", projects);

projectDropdownAdd.addEventListener("change", function () {
    console.log("Drop down clicked")
    var projectName = projectDropdownAdd.value;
    console.log(projectName)

    // Loop through the projects array to find the matching project name and get its order
    for (var i = 0; i < projects.length; i++) {
        if (projects[i]["name"] === projectName) {
            console.log(projects[i]["name"], "===", projectName, " ", i + 1);
            projectOrder = i + 1;
            break;
        }
    }

    console.log("po: ", projectOrder);

    // If project name not found, set the project order to the next consecutive number
    if (projectOrder === '') {
        projectOrder = projects.length + 1;
    }

    // Set the project order in the project order input
    console.log("po 1: ", projectOrder);
    projectOrderInputAdd.value = projectOrder;
    projectOrder--;
});



document.addEventListener('DOMContentLoaded', function () {
    var titleText = document.getElementById("title-add-modal");
    var taskOrderInput = document.getElementById("task_order_add");
    var taskOrder = '';

    titleText.addEventListener("input", function () {
        if (projects[projectOrder] != null) {
            taskOrder = projects[projectOrder]["tasks"].length + 1;
        }
        else {
            taskOrder = 1;
        }

        taskOrderInput.value = taskOrder;
    });
});


const closeModalBtn = document.getElementById("close-modal-btn");
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

var addTaskForm = document.getElementById("add_task");
addTaskForm.addEventListener("submit", function (event) {
    for (var i = 0; i < projects[projectOrder]["tasks"].length; i++) {
        console.log(titleText.value, " ", projects[projectOrder]["tasks"][i][1], " ", i)
        if (titleText.value === projects[projectOrder]["tasks"][i][1]) {
            console.log("same!");
            taskOrderInput.value = i;

            event.preventDefault();
            alert("Please enter a new task name.");
            break;
        }
    }
});

const addTaskBtn = document.getElementById("add-task-btn");
const modal = document.getElementById("modal");
addTaskBtn.addEventListener("click", () => {
    modal.style.display = "block";
});