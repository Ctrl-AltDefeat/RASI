FROM python:3.8.10-alpine3.13

# Establece el directorio de trabajo
WORKDIR /app

COPY . /app

ENV DB_HOST 10.128.0.8

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

RUN apk add --no-cache rust

RUN pip3 install --no-cache-dir -r dev_requirements.txt

ENTRYPOINT ["sh", "init.sh"]
