from sqlalchemy.orm import Mapped, mapped_column
from entity import BaseEntity


class IPSEntity(BaseEntity):
    __tablename__ = "ips"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str]
