from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from entity import BaseEntity


class MedicalHistoryEntity(BaseEntity):
    __tablename__ = "medical_history"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    medical_history: Mapped[str | None]
    hash: Mapped[str | None]
