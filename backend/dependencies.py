from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

db_user = "admin"
db_pass = "password"
db_host = "postgres"
db_port = 5432
db_name = "rasi"


async def get_db_session_factory() -> async_sessionmaker:
    engine = create_async_engine(
        f"postgresql+psycopg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}",
        echo=True,
    )
    return async_sessionmaker(engine)


db_session_factory = Annotated[async_sessionmaker, Depends(get_db_session_factory)]
