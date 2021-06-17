import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import Api from '../servicios/api';
const Crear = () => {
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm();
    const [postEmpleado, setPostEmpleado] = useState({
        nombre: '',
        correo: ''
    })

    const actualizarState = (e) => {
        setPostEmpleado({
            ...postEmpleado,
            [e.target.name]: e.target.value
        })
    }
    const enviarDatos = (e) => {


        e.preventDefault();


        fetch(`${Api}?insertar=1`, {
            method: 'Post',
            body: JSON.stringify(postEmpleado)
        })
            .then(respuesta => respuesta.json())
            .then((datoRespuesta) => {
                console.log(datoRespuesta)
                history.push("/")
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Empleados
                </div>
                <div className="card-body">
                    <form onSubmit={enviarDatos}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" className="form-control" name="nombre" value={postEmpleado.nombre} onChange={actualizarState} id="nombre" aria-describedby="emailHelpId" placeholder="Ingrese el nombre" />
                            <small id="emailHelpId" className="form-text text-muted">Escribe el nombre del empleado</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input type="email" className="form-control" name="correo" value={postEmpleado.correo} onChange={actualizarState} id="correo" aria-describedby="emailHelpId" placeholder="Ingrese el correo" required />
                            <small id="emailHelpId" className="form-text text-muted">Escribe el correo del empleado</small>
                        </div>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar Nuevo Empleado</button>
                            <Link to={"/"} className="btn btn-danger ms-2">Cancelar</Link>

                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">

                </div>
            </div>
        </div>
    )
}

export default Crear
