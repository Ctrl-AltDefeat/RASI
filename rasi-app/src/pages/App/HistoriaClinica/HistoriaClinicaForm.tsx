import React, { useEffect, useState } from 'react';
import {HistoriaClinica} from './HistoriaClinica';
import {Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text} from '@chakra-ui/react'
import {Link} from "react-router-dom";




function HistoriaClinicaForm() {

    const [historiaClinicas, setHistoriaClinicas] = useState<HistoriaClinica[]>([]);
    const [id, setId] = useState<string>('');
    const ip = "35.226.33.71";

    const buscarHistoriaClinica = () => {
        fetch('http://' + ip+':8000' + `/patients/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setHistoriaClinicas(data);
                } else {
                    console.log('La respuesta de la API no contiene datos válidos:', data);
                } // Actualiza el arreglo personas con la respuesta de la API
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
                        {historiaClinicas.map((historia:HistoriaClinica) => (
                            <Link to={`${historia.id}`}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Card>
                                    <CardHeader>
                                        <Heading size='md'>{historia.name}</Heading>
                                    </CardHeader>

                                    <CardBody>
                                        <Stack divider={<StackDivider />} spacing='4'>
                                            <Box>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    Fecha de Nacimiento
                                                </Heading>
                                                <Text pt='2' fontSize='sm'>
                                                    {historia.birth.toLocaleString()}
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    Genero
                                                </Heading>
                                                <Text pt='2' fontSize='sm'>
                                                    {historia.gender}
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    Historia Clinica
                                                </Heading>
                                                <Text pt='2' fontSize='sm'>
                                                    {historia.resume}
                                                </Text>
                                            </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </Link>

                        ))}
                    </div>
            </div>
        </>
    )
}
export default HistoriaClinicaForm;
