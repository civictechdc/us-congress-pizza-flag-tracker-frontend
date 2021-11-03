import React from "react";
import devAuth from "./Authenticate"

import Publicheader from "./publicHeader";
import Privateheader from "./privateHeader";



function Header() {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user && user.accessToken){
        return <Privateheader />;
    }
    return <Publicheader />
}

export default Header;