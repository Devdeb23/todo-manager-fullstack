package com.debora.taskmanager.backend; // <--- QUESTA DEVE ESSERE LA PRIMA E UNICA RIGA DI PACKAGE

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean; // <--- Assicurati che questi import ci siano
import org.springframework.web.servlet.config.annotation.CorsRegistry; // <---
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // <---

@SpringBootApplication
public class TodoBackendApplication { // Inizio della singola classe

	public static void main(String[] args) { // Metodo main
		SpringApplication.run(TodoBackendApplication.class, args);
	} // Fine del metodo main

	// !!! IL BLOCCO CORS VA INCOLLATO QUI, ESATTAMENTE COME SEGUE !!!
	// Non metterlo dentro il metodo main, né fuori dalla classe.
	// Deve essere qui, dopo il metodo main, ma prima della chiusura finale della classe.
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:63342", "null")
						.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}

} // Fine della singola classe (questa è l'ultima parentesi graffa nel file)