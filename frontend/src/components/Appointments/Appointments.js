import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Appointments() {
  const [especializacion, setEspecializacion] = useState("");
  const [especializaciones, setEspecializaciones] = useState([]);
  const [dia, setDia] = useState(new Date());
  const [hora, setHora] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/services`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos del servidor:", data); 
        setEspecializaciones(data);
        
      })
      .catch((error) => {
        console.error("Error al obtener las especializaciones:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Citas Disponibles</h2>
      <form>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="especializacion" className="form-label">
              Especialización
            </label>
            <select
              value={especializacion}
              onChange={(e) => setEspecializacion(e.target.value)}
              className="form-select"
              id="especializacion"
            >
              <option value="">Selecciona Especialización</option>
              {especializaciones.map((especializacion) => (
                <option key={especializacion.id} value={especializacion.id}>
                  {especializacion.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="dia" className="form-label">
              Fecha
            </label>
            <DatePicker
              selected={dia}
              onChange={(date) => setDia(date)}
              dateFormat="dd/MM/yyyy" // Ajusta el formato de fecha según tus preferencias
              className="form-control"
              id="dia"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="hora" className="form-label">
              Hora
            </label>
            <input
              type="text"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="form-control"
              id="hora"
              placeholder="Ingrese la hora"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Appointments;
