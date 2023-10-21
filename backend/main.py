from fastapi import FastAPI
from medicaments import api as medicaments_api

app = FastAPI()
app.include_router(medicaments_api.router)


@app.get(
    "/health",
    tags=["healthcheck"],
    summary="Perform a Health Check",
    response_description="Return HTTP Status Code 200 (OK)",
)
def get_medicament_availability_list():
    return "OK"
