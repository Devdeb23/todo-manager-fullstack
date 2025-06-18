$(document).ready(function() {
    const API_URL = "http://localhost:8080/api/tasks"; // URL del tuo backend Spring Boot

    // Funzione per caricare le attività esistenti
    function loadTasks() {
        $.get(API_URL, function(tasks) {
            $("#taskList").empty(); // Pulisce la lista esistente
            tasks.forEach(function(task) {
                addTaskToList(task);
            });
        }).fail(function(xhr, status, error) {
            console.error("Error loading tasks: ", xhr.responseText);
            alert("Error loading tasks: " + xhr.responseText);
        });
    }

    // Funzione per aggiungere una singola attività alla lista HTML
    function addTaskToList(task) {
        const listItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <span>${task.description}</span>
                <div>
                    <button class="btn btn-sm btn-success toggle-complete-btn mr-2">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                </div>
            </li>
        `;
        $("#taskList").append(listItem);
    }

    // Evento click per il pulsante "Add Task"
    $("#addTaskBtn").click(function() {
        const taskDescription = $("#taskInput").val().trim();
        if (taskDescription) {
            const newTask = {
                description: taskDescription,
                completed: false
            };
            $.ajax({
                url: API_URL,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(newTask),
                success: function(task) {
                    addTaskToList(task);
                    $("#taskInput").val(""); // Pulisce l'input
                },
                error: function(xhr, status, error) {
                    console.error("Error adding task: ", xhr.responseText);
                    alert("Error adding task: " + xhr.responseText);
                }
            });
        }
    });

    // Evento click per i pulsanti "Complete" / "Undo"
    $(document).on("click", ".toggle-complete-btn", function() {
        const listItem = $(this).closest(".list-group-item");
        const taskId = listItem.data("id");
        const isCompleted = listItem.hasClass("completed");

        $.ajax({
            url: `${API_URL}/${taskId}`,
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify({ completed: !isCompleted }),
            success: function(updatedTask) {
                listItem.toggleClass("completed");
                // Aggiorna il testo del pulsante
                listItem.find(".toggle-complete-btn").text(updatedTask.completed ? 'Undo' : 'Complete');
            },
            error: function(xhr, status, error) {
                console.error("Error updating task: ", xhr.responseText);
                alert("Error updating task: " + xhr.responseText);
            }
        });
    });

    // Evento click per i pulsanti "Delete"
    $(document).on("click", ".delete-btn", function() {
        const listItem = $(this).closest(".list-group-item");
        const taskId = listItem.data("id");

        $.ajax({
            url: `${API_URL}/${taskId}`,
            type: "DELETE",
            success: function() {
                listItem.remove();
            },
            error: function(xhr, status, error) {
                console.error("Error deleting task: ", xhr.responseText);
                alert("Error deleting task: " + xhr.responseText);
            }
        });
    });

    // Carica le attività all'avvio della pagina
    loadTasks();
});