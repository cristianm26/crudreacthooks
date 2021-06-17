import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Api from '../servicios/api';
const Listar = () => {

    const [empleados, setEmpleados] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        cargarDatos()
    }, [])

    const borrarRegistros = async (id) => {
        try {
            await axios
                .get(`${Api}?borrar=${id}`)
                .then(res => {
                    cargarDatos();
                });
        } catch (error) {
            console.log(error)
        }
    }

    const cargarDatos = async () => {
        try {
            const data = await axios
                .get(Api)
                .then(res => {
                    setEmpleados(res.data)
                });
            setLoading(true)
        } catch (error) {
            console.log(error)
        }
    }

    if (!loading) {
        return (<div>Cargando</div>)
    } else {
        return (

            <div className="card">
                <div className="card-header">
                    <Link type="button" className="btn btn-primary" to={"/crear"}>Crear Empleado</Link>
                </div>
                <div className="card-body">
                    <h4> Lista de Empleados</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map(empleado =>
                                <tr key={empleado.id}>
                                    <td>{empleado.id}</td>
                                    <td>{empleado.nombre}</td>
                                    <td>{empleado.correo}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="">
                                            <Link type="button" className="btn btn-info" to={`/editar/${empleado.id}`}

                                            >Editar</Link>
                                            <button type="button" className="btn btn-danger ms-2" onClick={() => borrarRegistros(empleado.id)} >Borrar</button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-muted">

                </div>
            </div>



        )
    }

}

export default Listar;