package com.debora.taskmanager.backend.repository; // Assicurati che questo package sia corretto

import com.debora.taskmanager.backend.model.Task; // Importa la classe Task che hai creato
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}