import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Appointments() {
    const [especializacion, setEspecializacion] = useState("");
    const [especializaciones, setEspecializaciones] = useState([]);
    const [doctoresEncontrados, setDoctoresEncontrados] = useState([]);
    const [dia, setDia] = useState(new Date());
    const [hora, setHora] = useState("");
    const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

    const ip = "35.226.33.71";

    const buscarEspecializacion = () => {
        fetch(`http://${ip}:8000/services`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    const especializacionesExistentes = data.map(
                        (item) => item.speciality
                    );
                    setEspecializaciones(especializacionesExistentes);
                }
            })
            .catch((error) => console.error("Error fetching services:", error));
    };

    useEffect(() => {
        buscarEspecializacion();
    }, []);

    const buscarCitasPorEspecializacionYHora = () => {
        fetch(
            `http://${ip}:8000/appointments/services/${especializacion}?date=${dia}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setDoctoresEncontrados(data.appointments);
                } 
            })
            .catch((error) =>
                console.error("Error fetching appointments:", error)
            );
    };

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
                                <option
                                    key={especializacion}
                                    value={especializacion}
                                >
                                    {especializacion}
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
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            id="dia"
                        />
                    </div>
                    {/* <div className="col-md-6">
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
                    </div> */}
                </div>
                <div className="text-center">
                    <button
                        type="button"
                        onClick={buscarCitasPorEspecializacionYHora}
                        className="btn btn-primary"
                    >
                        Buscar Citas
                    </button>
                </div>
            </form>
            {/* Mostrar resultados encontrados */}
            {doctoresEncontrados && doctoresEncontrados.length > 0 && (
            <div className="mt-4">
                <h3>Resultados Encontrados:</h3>
                <ul>
                    {doctoresEncontrados.map((cita) => (
                        <li key={cita.id}>
                            {cita.doctor} - {cita.fecha} - {cita.hora}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        </div>
    );
}

export default Appointments;
