import React from "react";
import {Link} from "react-router-dom";

import "./acceso.css";
//import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "antd";
const Acceso = () => {

    //const { loginWithRedirect } = useAuth0();

    return <>
        <div className="bg-gray-600 vh-100">
            <h1>Acceso</h1>

            <Button >Log In</Button>
        </div>



        </>
};

export default Acceso;
