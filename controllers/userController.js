//Funcíon para cargar la página de login
export const renderLogin = (req,res)=>{
    return res.render('login');
}

//Función para cargar la página de registro
export const renderRegistro = (req,res)=>{
    return res.render('register');
}

//Funcion POST para el registro de página
export const registerUser = async (req,res)=>{
    try {
        console.log(req);
    } catch (error) {
        console.log('Server Error:', error);
    }
}