from fastapi import APIRouter
from sqlalchemy import select
from dependencies import db_session_factory

from medicaments.dto import MedicamentAvailabilityDTO
from medicaments.entity import MedicamentAvailabilityEntity
from ips.entity import IPSEntity

router = APIRouter(prefix="/medicament", tags=["medicaments"])


@router.get(
    "medicaments_availability",
    summary="Retuns the medicament availability per IPS",
)
async def get_medicament_availability_list(
    IPS: str, session_factory: db_session_factory
) -> list[MedicamentAvailabilityDTO]:
    async with session_factory() as s:
        stmt = select(MedicamentAvailabilityEntity).filter(
            MedicamentAvailabilityEntity.ips.has(IPSEntity.name == IPS)
        )
        results = await s.scalars(stmt)

        medicament_availability_list = []
        for r in results:
            dto = MedicamentAvailabilityDTO(
                IPS=IPS,
                medicament_id=r.medicament_id,
                name=r.medicament.name,
                brand=r.medicament.brand,
                units_available=r.units_available,
            )
            medicament_availability_list.append(dto)

        return medicament_availability_list
