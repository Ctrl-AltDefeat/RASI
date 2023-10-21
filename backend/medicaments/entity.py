from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from entity import BaseEntity
from ips.entity import IPSEntity


class MedicamentEntity(BaseEntity):
    __tablename__ = "medicament"

    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    name: Mapped[str]
    brand: Mapped[str]
    units_available: Mapped[int]


class MedicamentAvailabilityEntity(BaseEntity):
    __tablename__ = "medicament_availability"

    medicament_id: Mapped[int] = mapped_column(
        ForeignKey("medicament.id"), primary_key=True, init=False
    )
    medicament: Mapped[MedicamentEntity] = relationship()
    ips_id: Mapped[int] = mapped_column(
        ForeignKey("ips.id"), primary_key=True, init=False
    )
    ips: Mapped[IPSEntity] = relationship()
    units_available: Mapped[int]
