from fastapi import FastAPI
import sqlalchemy as db


app = FastAPI()
engine = db.create_engine(
    "postgresql+psycopg://admin:password@postgres:5432/rasi", echo=True
)


@app.get("/")
def root():
    with engine.connect() as c:
        postgresql_version = c.execute(db.text("SELECT version()")).fetchone()[0]
        return ["Hello world", {"postgres_version": postgresql_version}]
