            # Usa la imagen oficial de OpenJDK 24 (slim = más liviana)
            FROM eclipse-temurin:24-jdk-alpine AS builder

            # Instala Maven
            RUN apk add --no-cache maven

            # Establece el directorio de trabajo
            WORKDIR /app

            # Copia todo el código al contenedor
            COPY . .

            # Empaqueta la app (sin correr tests para ahorrar tiempo)
            RUN mvn clean package -DskipTests

            # ----------------------------------------

            # Imagen final para ejecutar el .jar
            FROM eclipse-temurin:24-jdk-alpine

            WORKDIR /app

            # Copia el .jar desde el builder
            COPY --from=builder /app/target/*.jar app.jar

            # Expone el puerto 8080
            EXPOSE 8080

            # Comando para ejecutar el backend
            CMD ["java", "-jar", "app.jar"]
