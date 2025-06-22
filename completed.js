const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

function saveCompletedTasksToLocalStorage() {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function renderCompletedTasks() {
    const taskCard = document.querySelector(".completed-task-card");
    if (completedTasks.length === 0) {
        taskCard.innerHTML = `<p class="text-center fs-3 p-5 m-5">No completed tasks yet.</p>`;
        return;
    }

    taskCard.innerHTML = "";
    for (let i = 0; i < completedTasks.length; i++) {
        taskCard.innerHTML += `
                        <div class="box-the-task col-12 shadow-lg p-3 mb-5 bg-body-tertiary rounded d-flex justify-content-between">
                    <div class="chek-and-address d-flex justify-content-between align-items-center">
                        <div class="Task-completion-check btn me-4 fs-1 " onclick="viewTask(${i})" > 
                            <i class="fas fa-check text-primary"></i>
                        </div>
                            <span class="ms-3 fs-5 fw-bold">${completedTasks[i].address}</span>
                        </label>
                    </div>
                    <div>
                        <div class="view-task btn me-5 " onclick="viewCompletedTask(${i})" > 
                            <i class="fa-solid fa-eye fs-1"></i>
                        </div>
                        <div class="remove-task btn " onclick="removeCompletedTask(${i})">
                            <i class="fas fa-trash-can fs-1"></i>
                        </div>
                    </div>
                </div>
        `;
    }
}

function removeCompletedTask(index) {
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
            completedTasks.splice(index, 1);
            saveCompletedTasksToLocalStorage();
            renderCompletedTasks();
            Swal.fire("Deleted !", "The task has been deleted.", "success");
        }
    });
}

function viewCompletedTask(index) {
    const task = completedTasks[index];
    Swal.fire({
        title: ` ${task.address}`,
        text: `${task.description}`,
        // icon: "info",
        confirmButtonText: "OK",
    });
}


renderCompletedTasks();
