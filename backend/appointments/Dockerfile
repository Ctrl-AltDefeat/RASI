FROM python:3.8.10-slim-buster

# Establece el directorio de trabajo
WORKDIR /app

COPY . /app

ENV DB_HOST 10.128.0.8

RUN apk add --no-cache postgresql-dev gcc g++ python3-dev musl-dev

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN apk add --no-cache rust

RUN pip3 install sqlalchemy

RUN pip3 install --no-cache-dir -r dev_requirements.txt

ENTRYPOINT ["sh", "init.sh"]
