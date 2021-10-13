import React from "react";
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