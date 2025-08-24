import User from "../models/User.js";
import bccrypt from "bcrypt";

//Funcíon para cargar la página de login
export const renderLogin = (req, res) => {
  return res.render("login");
};
//Funcion POST para el el login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar campos vacíos
    if (!username || !password ) {
      return res.render("login", {
        alert: { status: "error", msg: "Todos los campos son obligatorios." },
      });
    }
    //Comprobar si el usuario está registrado
    const existUser = await User.findOne({username});
    if(!existUser){
        return res.render("login", {
        alert: { status: "error", msg: "Todos los campos son obligatorios." },
      });
    }
    
    //Comprobar contraseña
    const passwordEquals = await bccrypt.compare(password,existUser.password);
    if(!passwordEquals){
        return res.render("login", {
        alert: { status: "error", msg: "Todos los campos son obligatorios." },
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).render("login", { 
      alert: { status: "error", msg: "Error en el servidor." }
    });
  }
};
//Función para cargar la página de registro
export const renderRegistro = (req, res) => {
  return res.render("register");
};

//Funcion POST para el registro de página
export const registerUser = async (req, res) => {
  try {
    const { username, password, repeatPassword } = req.body;

    // Validar campos vacíos
    if (!username || !password || !repeatPassword) {
      return res.render("register", {
        alert: { status: "error", msg: "Todos los campos son obligatorios." },
      });
    }

    if (username.trim() === "") {
      return res.render("register", {
        alert: {
          status: "error",
          msg: "El nombre de usuario no puede estar vacío.",
        },
      });
    }

    if (password.length < 6) {
      return res.render("register", {
        alert: {
          status: "error",
          msg: "La contraseña debe tener al menos 6 caracteres.",
        },
      });
    }

    if (password !== repeatPassword) {
      return res.render("register", {
        alert: { status: "error", msg: "Las contraseñas no coinciden." },
      });
    }

    //Comprobamos que no exista el usuario
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.render("register", {
        alert: { status: "error", msg: "Usuario ya registrado." },
      });
    }

    //Registramos al usuario si
    const hashedPassword = await bccrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
    });

    //Regresamos mensaje de todo ok
    return res.render("register", {
        alert: { status: "success", msg: "Registrado ya puedes iniciar sesión." },
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).render("register", { 
      alert: { status: "error", msg: "Error en el servidor." }
    });
  }
};
