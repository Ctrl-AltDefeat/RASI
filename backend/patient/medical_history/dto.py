from pydantic import BaseModel, ConfigDict


class MedicalHistoryDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    medical_history: str
    hash: str


class MedicalHistoryUpdateDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    text: str
