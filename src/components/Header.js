import React, { useState } from "react";
import { Link } from "react-router-dom";
import devAuth from "./Authenticate"

import Publicheader from "./publicHeader";
import Privateheader from "./privateHeader";



function Header() {
    let auth = devAuth.isAuthenticated

    if(auth === true){
        return <Privateheader />;
    }
    return <Publicheader />
}

export default Header;