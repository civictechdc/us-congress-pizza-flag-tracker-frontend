//check if user is logged in and has a token
export function isUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    const token = user.accessToken;

    if (user && token) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//check admin status
export function adminControl() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    const admin = user.is_admin;

    if (admin === "Y") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//check edit status
export function editOrderControl() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    const editor = user.manage_all_orders;
    console.log("Editor: ", editor);
    console.log("User: ", user); //temporary while security and routing are worked on

    if (editor === "Y") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//get user office
export function userOffice() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    const officeCode = user.office_code;
    return officeCode;
  } else {
    return "none";
  }
}

//check what statuses can user update
export function statusControl() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    const officeCode = user.office_code;
    const statusAuth = user.can_update_status_for;

    switch (statusAuth) {
      case "ALL":
        return "ALL";
      case "office_code":
        return officeCode;
      default:
        return "NONE";
    }
  } else {
    return "NONE";
  }
}

//check is user cane create orders
export function orderControl() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    const orderAuth = user.can_create_update_delete_orders;

    if (orderAuth === "Y") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//check whose password the user can change
export function passwordControl() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    const officeCode = user.office_code;
    const passwordAuth = user.can_update_password_for;

    switch (passwordAuth) {
      case "ALL":
        return "ALL";
      case "SELF":
        return "SELF";
      case "office_code":
        return officeCode;
      default:
        return "NONE";
    }
  } else {
    return;
  }
}

//check if user is fed account
export function isFed() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    const officeCode = user.office_code;

    let prefix = officeCode;

    if (prefix.includes("FED")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
