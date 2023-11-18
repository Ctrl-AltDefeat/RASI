from hashlib import sha256

from fastapi import APIRouter
from sqlalchemy import select, update
from dependencies import db_session_factory

from patient.medical_history.dto import MedicalHistoryDTO, MedicalHistoryUpdateDTO
from patient.medical_history.entity import MedicalHistoryEntity

router = APIRouter(
    prefix="/patient/medical_history", tags=["medical_history", "patient"]
)


@router.get(
    "medical_history/{id}",
    summary="Retuns the medical history",
)
async def get_medical_history(
    id: int, session_factory: db_session_factory
) -> list[MedicalHistoryDTO]:
    async with session_factory() as s:
        stmt = select(MedicalHistoryEntity).where(MedicalHistoryEntity.id == id)
        results = await s.scalars(stmt)

        medical_history_list = []
        for r in results:
            dto = MedicalHistoryEntity(
                id=id, medical_history=r.medical_history, hash=r.hash
            )
            medical_history_list.append(dto)

        assert len(medical_history_list) == 1

        medical_history = medical_history_list[0]

        hash = sha256(medical_history.text).hexdigest()
        assert medical_history.hash == hash

        return medical_history


@router.put(
    "medical_history/{id}",
    summary="Retuns the medical history",
)
async def update_medical_history(
    id: int,
    medical_history: MedicalHistoryUpdateDTO,
    session_factory: db_session_factory,
) -> list[MedicalHistoryDTO]:
    hash = sha256(medical_history.text).hexdigest()
    async with session_factory() as s:
        stmt = (
            update(MedicalHistoryEntity)
            .where(MedicalHistoryEntity.id == id)
            .values(text=medical_history.text, hash=hash)
        )
        s.execute(stmt)

    return MedicalHistoryDTO(id=id, text=medical_history.text, hash=hash)
