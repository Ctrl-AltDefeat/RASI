from sqlalchemy.orm import MappedAsDataclass, DeclarativeBase


class BaseEntity(MappedAsDataclass, DeclarativeBase):
    pass
