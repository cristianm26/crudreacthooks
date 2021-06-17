import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams, Link, useHistory } from 'react-router-dom';
import Api from '../servicios/api';
const Editar = () => {
    const history = useHistory();
    const { id } = useParams();
    const [empleado, setEmpleado] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const obtenerEmpleado = async () => {

            const data = await axios.get(`${Api}?consultar=${id}`)
                .then(resp => {
                    setEmpleado(resp.data[0])
                    setLoading(true)
                }).catch(err => console.log(err))
        }
        obtenerEmpleado()
    }, [id])

    const enviarDatos = (e) => {
        e.preventDefault();
        const { id, nombre, correo } = empleado;
        const datosEnviar = { id, nombre, correo }
        fetch(`${Api}?actualizar=1`, {
            method: 'POST',
            body: JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((datoRespuesta) => {
                history.push("/")
            })
            .catch(error => console.log(error))
    }
    if (!loading) {
        return (<div>Cargando</div>)
    } else {
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        Editar Empleado
                    </div>
                    <div className="card-body">
                        <form onSubmit={enviarDatos}>



                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={empleado.nombre} onChange={(e) => setEmpleado({ ...empleado, nombre: e.target.value })} id="nombre" aria-describedby="emailHelpId" placeholder="Ingrese el nombre" />
                                <small id="emailHelpId" className="form-text text-muted">Escribe el nombre del empleado</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo">Correo Electrónico</label>
                                <input type="email" className="form-control" name="correo" value={empleado.correo} onChange={(e) => setEmpleado({ ...empleado, correo: e.target.value })} id="correo" aria-describedby="emailHelpId" placeholder="Ingrese el correo" />
                                <small id="emailHelpId" className="form-text text-muted">Escribe el correo del empleado</small>
                            </div>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar Empleado</button>
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

}

export default Editar
