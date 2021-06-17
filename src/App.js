import React from 'react'
import Listar from './components/Listar'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Crear from './components/Crear';
import Editar from './components/Editar';
const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>Sistema <span className="sr-only"></span></Link>
          <Link className="nav-item nav-link" to={"/crear"}>Crear Empleado</Link>
          <Link className="nav-item nav-link" to={"/editar"}>Editar Empleado</Link>
        </div>
      </nav>
      <div className="container" >
        <br></br>
        <Route path="/" exact component={Listar} />
        <Route path="/crear" component={Crear} />
        <Route path="/editar/:id" component={Editar} />
      </div>
    </Router>

  )
}

export default App
