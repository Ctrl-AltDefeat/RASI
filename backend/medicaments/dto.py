from pydantic import BaseModel, ConfigDict


class MedicamentAvailabilityDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    IPS: str
    medicament_id: int
    name: str
    brand: str
    units_available: int
