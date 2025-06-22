// const allTasks = [];
const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}


function addTask(e) {
    e.preventDefault();
    const addressTaskInput = document.querySelector(".task-address");
    const descriptionTaskInput = document.querySelector(".task-description");

    const task = {
        address: addressTaskInput.value,
        description: descriptionTaskInput.value,
    };
    addressTaskInput.value = "";
    descriptionTaskInput.value = "";
    allTasks.push(task);
    renderTask();
    counterAllTask();
    saveTasksToLocalStorage();
    counterRestTask();
    // console.log(allTasks)

}
document.querySelector(".bnt-add-task").onclick = addTask;

function renderTask() {
    const taskCard = document.querySelector(".task-card");
    taskCard.innerHTML = ``
    for (i = 0; i < allTasks.length; i++){
        taskCard.innerHTML += `
                        <div class="box-the-task col-12 shadow-lg p-3 mb-5 bg-body-tertiary rounded d-flex justify-content-between">
                    <div class="chek-and-address d-flex justify-content-between align-items-center">
                        <input class="form-check-input fs-1 m-0" type="checkbox" onclick="markTaskCompleted(${i})" id="check-${i}">
                        <label class="form-check-label" for="checkDefault">
                            <span class="ms-3 fs-5 fw-bold">${allTasks[i].address}</span>
                        </label>
                    </div>
                    <div>
                        <div class="view-task btn " onclick="viewTask(${i})" > 
                            <i class="fa-solid fa-eye fs-1"></i>
                        </div>
                        <div class="edit-task btn mx-5" onclick="editTask(${i})">
                            <i class="fa-solid fa-screwdriver-wrench fs-1"></i>
                        </div>
                        <div class="remove-task btn " onclick="removeTask(${i})">
                            <i class="fas fa-trash-can fs-1"></i>
                        </div>
                    </div>
                </div>
        `;
    }
}

function viewTask(index) {
    const task = allTasks[index];
    Swal.fire({
        title: ` ${task.address}`,
        text: `${task.description}`,
        // icon: "info",
        confirmButtonText: "OK",
    });
}

function editTask(index) {
    const task = allTasks[index];

    Swal.fire({
        title: "Task update",
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="address" value="${task.address}">
            <input id="swal-input2" class="swal2-input" placeholder="description" value="${task.description}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save changes",
        cancelButtonText: "cancel",
        preConfirm: () => {
            const newAddress = document.getElementById("swal-input1").value;
            const newDescription = document.getElementById("swal-input2").value;

            return {
                address: newAddress,
                description: newDescription,
            };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            allTasks[index] = result.value;
            saveTasksToLocalStorage();
            renderTask();
            Swal.fire("Modified !", "Your changes saved successfully.", "success");
        }
    });
}

function removeTask(index) {
    Swal.fire({
        title: "Are you sure ?",
        text: "You can't undo this !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it !",
        cancelButtonText: "cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            allTasks.splice(index, 1);
            saveTasksToLocalStorage();
            renderTask();
            Swal.fire("Deleted !", "The task has been deleted.", "success");
        }
        counterAllTask();
        counterRestTask();
    });
}


function markTaskCompleted(index) {
    const completedTask = allTasks.splice(index, 1)[0]; 

    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.push(completedTask);

    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    saveTasksToLocalStorage(); 
    renderTask();
    counterAllTask(); 
    counterCompletedTask();
    counterRestTask();
}






function counterAllTask() {
    let count = allTasks.length;
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    let counterCompleted = completedTasks.length;
    let counterTask = count + counterCompleted;
    // console.log(counterTask);
    document.querySelector(".counter-all-task-number").innerHTML = `${counterTask}`;
}

function counterCompletedTask() {
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    let counterCompleted = completedTasks.length;
    // console.log(counterCompleted);
    document.querySelector(".counter-task-end-number").innerHTML = `${counterCompleted}`;
}
counterCompletedTask();

function counterRestTask() {
    let counterTask = allTasks.length;
    // console.log(counterTask);
    document.querySelector(".counter-rest-number").innerHTML = `${counterTask}`;
}
counterRestTask();

renderTask();
counterAllTask();