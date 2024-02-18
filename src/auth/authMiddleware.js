import jwt from 'jsonwebtoken';
const secretKey = 'tu_clave_secreta'; // Reemplaza con tu propia clave secreta




export const authHeaderMiddleware = (req, res, next) => {
  // Aquí puedes obtener el token de autenticación de la cookie, el almacenamiento local, etc.
  const token = req.cookies.token; // Asegúrate de configurar correctamente el middleware de cookies

  if (token) {
    // Si hay un token, agrega la cabecera 'Authorization' a la solicitud
    console.log("Hay token")
    req.headers['Authorization'] = "Hola";
  }
  // Continúa con el siguiente middleware
  next();
};


export const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Token verificado")
  if (token) {
      console.log(token)
      jwt.verify(token, secretKey, (err, user) => {
          if (err) {
              // Si el token es inválido, puedes manejarlo según tus necesidades (por ejemplo, limpiar la cookie)
              console.error('Error al verificar el token:', err);
              res.clearCookie('token'); // Limpiar la cookie en caso de error
          } else {
              console.log("Hizo else")
              req.headers['Authorization'] = `Bearer ${token}`;
              // req.user = user;
          }
          next();
      });
  } else {
      next();
  }
};

// export const authenticateToken = (req, res, next) => {
//   console.log("Inicia autenticación")
//   let token = null
//   if(req.cookies.token){
//     console.log(token)
//     token = req.cookies.token
//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) {
//         return res.redirect('/login.html');
//       }
  
//       next();
//     });
//   }
//   else{
//     console.log("No hay Cookie")
//     if(req.header('auth') == "Galatea") {
//     next();
//   }
//   else{
//     return res.redirect('/login.html');
//   }
// };
// };

export const authenticateToken = (req, res, next) => {
  console.log("Inicia autenticación");
  let token = null;
  if (req.cookies.token) {
    console.log(token);
    token = req.cookies.token;
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.redirect('/login.html');
      }
      next();
    });
  } else {
    console.log("No hay Cookie");
    if (
      req.header('auth') == "Galatea"
    ) {
      next();
    } else {
      return res.redirect('/login.html');
    }
  }
};



