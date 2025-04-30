
export const checkValidateData = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    
    // Simplify password validation to match Firebase requirements
    const isPasswordValid = password.length >= 6;
    
    if(!isEmailValid){
        return "Email is not valid";
    }
    if(!isPasswordValid){
        return "Password must be at least 6 characters";
    }
    return null;
}
