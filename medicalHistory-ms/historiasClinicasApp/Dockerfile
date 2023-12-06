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



# Establece las variables de entorno
ENV MEASUREMENTS_DB_HOST 10.128.0.4

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000


# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
