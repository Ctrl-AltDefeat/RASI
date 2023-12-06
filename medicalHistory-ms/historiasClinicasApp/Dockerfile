# Utiliza una imagen base de Python con Alpine Linux
FROM python:3.8.10-alpine3.13

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Añade un usuario no privilegiado
RUN adduser -D myuser
USER myuser

# Copia la aplicación Django al directorio de trabajo
COPY . /app

USER root

EXPOSE 8080

# Establece las variables de entorno
ENV MEASUREMENTS_DB_HOST 10.128.0.4

# Actualiza e instala dependencias de PostgreSQL y Python
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev \
    && pip install --no-cache-dir -r requirements.txt

# Elimina dependencias temporales y caché de APK
RUN apk del postgresql-dev gcc python3-dev musl-dev \
    && rm -rf /var/cache/apk/*

# Comando de entrada al iniciar el contenedor
ENTRYPOINT ["sh", "init.sh"]
