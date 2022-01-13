//check if user is logged in and has a token

    export function isUser()  {  

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;

        if(user && token){
            return true
        }
        else{
            return false
        }
    }

    //check admin status

    export function adminControl() {

        const user = JSON.parse(localStorage.getItem("user"));
        const admin = user.is_admin;
        console.log(admin)

        if(admin === "Y"){
            return true;
        }else {
            return false
        }

    }

    //get user office
    export function userOffice() {

        const user = JSON.parse(localStorage.getItem("user"));
        const officeCode = user.office_code;

        return officeCode
    }

    //check what statuses can user update
    export function statusControl() {

        const user = JSON.parse(localStorage.getItem("user"));
        const officeCode = user.office_code;
         const statusAuth = user.can_update_status_for;

        switch(statusAuth){
            case "ALL":
                return "ALL";
            case "office_code":
                return officeCode
            default:
                return "NONE";
                    
        }
    }

    //check is user cane create orders
    export function orderControl() {

        const user = JSON.parse(localStorage.getItem("user"));
        const orderAuth = user.can_create_update_delete_orders;

        if(orderAuth === "Y"){
            return true;
        }else {
            return false
        }
    }

    //check whose password the user can change
    export function passwordControl() {

        const user = JSON.parse(localStorage.getItem("user"));
        const officeCode = user.office_code;
        const passwordAuth = user.can_update_password_for;

        switch(passwordAuth){
            case "ALL":
                return "ALL";
            case "SELF":
                return "SELF";
            case "office_code":
                return officeCode;
            default:
                return "NONE"


        }
    }

    //check if user is fed account
    export function isFed() {

        const user = JSON.parse(localStorage.getItem("user"));
        const officeCode = user.office_code;
        
        let prefix = officeCode

        if (prefix.includes('FED')){
            return true
        }else{
            return false
        }
    }

   