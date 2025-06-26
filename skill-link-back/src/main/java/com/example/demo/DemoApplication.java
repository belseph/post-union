package com.example.demo;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// importaciones relacionadas con .env que podrías eliminar si no vas a usarlo
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@SpringBootApplication(scanBasePackages = "com.example.demo")
public class DemoApplication {

	public static void main(String[] args) {

		// loadEnvironmentVariables();

		SpringApplication.run(DemoApplication.class, args);
	}

	/*
	private static void loadEnvironmentVariables(){
		try{
			Dotenv dotenv = Dotenv.configure()
					.directory(System.getProperty("user.dir"))
					.filename(".env")
					.ignoreIfMissing()
					.load();

			String[] allowedVariables = {"DB_PASSWORD_SKILL_LINK", "JWT_SECRET"};

			for (String varName : allowedVariables) {
				String value = dotenv.get(varName);
				if (value != null) {
					System.setProperty(varName, value);
					System.out.println("Variable establecida: " + varName + " = " + value);
				} else {
					System.err.println("Variable no encontrada en .env: " + varName);
				}
			}

		} catch (Exception e) {
			System.err.println("Error al cargar las variables de entorno: " + e.getMessage());
		}
	}
	*/
}
