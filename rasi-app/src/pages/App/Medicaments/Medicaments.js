import React, { useState } from "react";

function Medicaments() {
    const [medicamento, setMedicamento] = useState("");
    const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

    const ip = "35.226.33.71";

    const buscarMedicamento = () => {


        // Hacer la solicitud GET al endpoint de medicamentos en el backend
        fetch(`http://${ip}/ips/1/medicaments/${medicamento}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    const detalles = {
                        Nombre: data.name,
                        Marca: data.brand,
                        "Cantidad Disponible": data.avaliable,
                    };
                    setResultadoBusqueda(detalles);
                } else {
                    setResultadoBusqueda(null);
                }
            })
            .catch((error) =>
                console.error("Error fetching medicaments:", error)
            );
    };

    return (
        <div className="container mt-4 text-center">
            <h2>Medicamentos</h2>
            <form className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del Medicamento"
                        value={medicamento}
                        onChange={(e) => setMedicamento(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={buscarMedicamento}
                    >
                        Consultar Disponibilidad
                    </button>
                </div>
            </form>
            {resultadoBusqueda && (
                <div>
                    <h3>Medicamento encontrado:</h3>
                    <table className="table">
                        <tbody>
                            {Object.entries(resultadoBusqueda).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{resultadoBusqueda.Nombre}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Medicaments;
