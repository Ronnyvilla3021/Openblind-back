const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../../../config/keys");

let sequelize;

if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI, {
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        pool: {
            max: 20,
            min: 5,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    });   
} else {
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {   
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',    
        dialectOptions: {
            charset: 'utf8mb4',
        },   
        pool: {
            max: 20,
            min: 5,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    });
}

sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

const syncOptions = process.env.NODE_ENV === 'development' ? { force: true } : { alter: true };

sequelize.sync(syncOptions)
    .then(() => {
        console.log('Base de Datos sincronizadas');
    })
    .catch((error) => {
        console.error('Error al sincronizar la Base de Datos:', error);
    });

// Extracción de modelos - RUTAS CORREGIDAS
const usuarioModel = require('./models/usuario')
const rolModel = require('./models/rol')
const detalleRolModel = require('./models/detalleRol')
const pageModel = require('./models/page')
const categoriaTransporteModel = require('./models/categoriaTransporte');
const transporteModel = require('./models/transporte');
const empresaTransporteModel = require('./models/empresaTransporte');
const conductorModel = require('./models/conductor');
const estacionModel = require('./models/estacion');
const categoriaEstacionModel = require('./models/categoriaEstacion');
const rutaModel = require('./models/ruta');
const rutaEstacionModel = require('./models/rutaEstacion');
const horarioModel = require('./models/horario');
const metodoIngresoModel = require('./models/metodoIngreso');
const estacionMetodoModel = require('./models/estacionMetodo');
const categoriaLugarModel = require('./models/categoriaLugar');
const lugarTuristicoModel = require('./models/lugarTuristico');
const tipoMensajeModel = require('./models/tipoMensaje');
const mensajeModel = require('./models/mensaje');
const guiaVozModel = require('./models/guiaVoz');
const idiomaModel = require('./models/idioma');
const calificacionModel = require('./models/calificacion');
const tarifaModel = require('./models/tarifa');
const clienteModel = require('./models/cliente');

// Instanciar los modelos a sincronizar
const usuario = usuarioModel(sequelize, Sequelize)
const rol = rolModel(sequelize, Sequelize)
const detalleRol = detalleRolModel(sequelize, Sequelize)
const page = pageModel(sequelize, Sequelize)
const categoriaTransporte = categoriaTransporteModel(sequelize, Sequelize);
const transporte = transporteModel(sequelize, Sequelize);
const empresaTransporte = empresaTransporteModel(sequelize, Sequelize);
const conductor = conductorModel(sequelize, Sequelize);
const estacion = estacionModel(sequelize, Sequelize);
const categoriaEstacion = categoriaEstacionModel(sequelize, Sequelize);
const ruta = rutaModel(sequelize, Sequelize);
const rutaEstacion = rutaEstacionModel(sequelize, Sequelize);
const horario = horarioModel(sequelize, Sequelize);
const metodoIngreso = metodoIngresoModel(sequelize, Sequelize);
const estacionMetodo = estacionMetodoModel(sequelize, Sequelize);
const categoriaLugar = categoriaLugarModel(sequelize, Sequelize);
const lugarTuristico = lugarTuristicoModel(sequelize, Sequelize);
const tipoMensaje = tipoMensajeModel(sequelize, Sequelize);
const mensaje = mensajeModel(sequelize, Sequelize);
const guiaVoz = guiaVozModel(sequelize, Sequelize);
const idioma = idiomaModel(sequelize, Sequelize);
const calificacion = calificacionModel(sequelize, Sequelize);
const tarifa = tarifaModel(sequelize, Sequelize);
const cliente = clienteModel(sequelize, Sequelize);

// Relaciones o ForeignKeys
usuario.hasMany(detalleRol)
detalleRol.belongsTo(usuario)

rol.hasMany(detalleRol)
detalleRol.belongsTo(rol)

usuario.hasMany(page)
page.belongsTo(usuario)

// RELACIONES TRANSPORTE
categoriaTransporte.hasMany(transporte);
transporte.belongsTo(categoriaTransporte);

empresaTransporte.hasMany(transporte);
transporte.belongsTo(empresaTransporte);

conductor.hasMany(transporte);
transporte.belongsTo(conductor);

// RELACIONES ESTACION
categoriaEstacion.hasMany(estacion);
estacion.belongsTo(categoriaEstacion);

// RELACIONES RUTA-TRANSPORTE
ruta.hasMany(transporte);
transporte.belongsTo(ruta);

// RELACIONES RUTA-ESTACION (N:M)
ruta.hasMany(rutaEstacion);
rutaEstacion.belongsTo(ruta);
estacion.hasMany(rutaEstacion);
rutaEstacion.belongsTo(estacion);

// RELACIONES HORARIOS
ruta.hasMany(horario);
horario.belongsTo(ruta);

estacion.hasMany(horario);
horario.belongsTo(estacion);

// RELACIONES METODOS INGRESO-ESTACION (N:M)
estacion.hasMany(estacionMetodo);
estacionMetodo.belongsTo(estacion);
metodoIngreso.hasMany(estacionMetodo);
estacionMetodo.belongsTo(metodoIngreso);

// RELACIONES LUGARES TURISTICOS
categoriaLugar.hasMany(lugarTuristico);
lugarTuristico.belongsTo(categoriaLugar);

estacion.hasMany(lugarTuristico);
lugarTuristico.belongsTo(estacion);

// RELACIONES MENSAJES
tipoMensaje.hasMany(mensaje);
mensaje.belongsTo(tipoMensaje);

usuario.hasMany(mensaje);
mensaje.belongsTo(usuario);

// RELACIONES GUIAS DE VOZ
mensaje.hasMany(guiaVoz);
guiaVoz.belongsTo(mensaje);

idioma.hasMany(guiaVoz);
guiaVoz.belongsTo(idioma);

lugarTuristico.hasMany(guiaVoz);
guiaVoz.belongsTo(lugarTuristico);

usuario.hasMany(guiaVoz);
guiaVoz.belongsTo(usuario);

// RELACIONES CALIFICACIONES
usuario.hasMany(calificacion);
calificacion.belongsTo(usuario);

transporte.hasMany(calificacion);
calificacion.belongsTo(transporte);

conductor.hasMany(calificacion);
calificacion.belongsTo(conductor);

ruta.hasMany(calificacion);
calificacion.belongsTo(ruta);

estacion.hasMany(calificacion);
calificacion.belongsTo(estacion);

lugarTuristico.hasMany(calificacion);
calificacion.belongsTo(lugarTuristico);

guiaVoz.hasMany(calificacion);
calificacion.belongsTo(guiaVoz);

// RELACIONES TARIFAS
ruta.hasMany(tarifa);
tarifa.belongsTo(ruta);

transporte.hasMany(tarifa);
tarifa.belongsTo(transporte);

lugarTuristico.hasMany(tarifa);
tarifa.belongsTo(lugarTuristico);

// RELACIONES ADICIONALES
usuario.hasMany(lugarTuristico);
lugarTuristico.belongsTo(usuario);

usuario.hasMany(conductor);
conductor.belongsTo(usuario);

module.exports = {
  usuario,
  rol,
  detalleRol,
  page,
  categoriaTransporte,
  transporte,
  empresaTransporte,
  conductor,
  estacion,
  categoriaEstacion,
  metodoIngreso,
  estacionMetodo,
  ruta,
  rutaEstacion,
  horario,
  categoriaLugar,
  lugarTuristico,
  tipoMensaje,
  mensaje,
  guiaVoz,
  idioma,
  calificacion,
  tarifa,
  cliente,
};