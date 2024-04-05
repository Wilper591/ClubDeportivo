const { app, PORT } = require("./src/app.js");

// Iniciar el servidor con Nodemon
app.listen(PORT, () => {
  console.log(
    `Servidor Express corriendo en el puerto ${PORT} - PID ${process.pid}`
  );
});
