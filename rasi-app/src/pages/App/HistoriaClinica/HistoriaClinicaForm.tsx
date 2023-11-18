import React, { useEffect, useState } from 'react';
import {HistoriaClinica} from './HistoriaClinica';
import {Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text} from '@chakra-ui/react'
import {Link} from "react-router-dom";
import { sha256 } from 'js-sha256';


function HistoriaClinicaForm() {

    const [historiaClinica, setHistoriaClinica] = useState<HistoriaClinica|null>(null);
    const [id, setId] = useState<string>('');
    const ip = "35.226.33.71";

    const buscarHistoriaClinica = () => {
        fetch('http://' + ip + ':8000' + `/patients/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const { hash, resume, ...rest } = data; // Extracción de hash y resume
                    setHistoriaClinica(data);
                    const temp = "90386affed0e347d5fc56d15a46ecc574dde2fd9c78c52ea4da43019a5f7c7a2";

                    console.log(hash)
                    const hashedResume = sha256(resume);
                    console.log(hashedResume)
                    if (hash === hashedResume) {
                        console.log('La información no ha sido modificada.');
                    } else {
                        console.log('¡Alerta! La información ha sido modificada.');
                    }
                } else {
                    console.log('La respuesta de la API no contiene datos válidos:', data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }




    return (
        <>
            <div className="container mt-4 text-center">
                <h2>Historia Clinica</h2>
                <form className="mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="id del paciente"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={buscarHistoriaClinica}
                        >
                            Consultar Historia Clinica
                        </button>
                    </div>
                </form>

                    <div className="col-8" >

                        {historiaClinica && (
                            <Link to={`${historiaClinica.id}`}>
                                <Card>
                                    <CardHeader>
                                        <Heading size="md">{historiaClinica.name}</Heading>
                                    </CardHeader>

                                    <CardBody>
                                        <Stack divider={<StackDivider />} spacing="4">
                                            <Box>
                                                <Heading size="xs" textTransform="uppercase">
                                                    Fecha de Nacimiento
                                                </Heading>
                                                <Text pt="2" fontSize="sm">
                                                    {historiaClinica.birth.toLocaleString()}
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Heading size="xs" textTransform="uppercase">
                                                    Genero
                                                </Heading>
                                                <Text pt="2" fontSize="sm">
                                                    {historiaClinica.gender}
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Heading size="xs" textTransform="uppercase">
                                                    Historia Clinica
                                                </Heading>
                                                <Text pt="2" fontSize="sm">
                                                    {historiaClinica.resume}
                                                </Text>
                                            </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </Link>
                        )}
                    </div>
            </div>
        </>
    )
}
export default HistoriaClinicaForm;
