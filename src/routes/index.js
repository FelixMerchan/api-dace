const { Router } = require('express');
const router = Router();

// requerimos los endpoint que se encuentran en ciudades.routes
router.use(require('./ciudades.routes'));
// requerimos los endpoint que se encuentran en agencias.routes
router.use(require('./agencias.routes'));
// requerimos los endpoint que se encuentran en canales.routes
router.use(require('./canal.routes'));
// requerimos los endpoint que se encuentran en clientes.routes
router.use(require('./clientes.routes'));
// requerimos los endpoint que se encuentran en interacciones.routes
router.use(require('./interacciones.routes'));
// requerimos los endpoint que se encuentran en motivos.routes
router.use(require('./motivos.routes'));
// requerimos los endpoint que se encuentran en temas.routes
router.use(require('./temas.routes'));
// requerimos los endpoint que se encuentran en usuarios.routes
router.use(require('./usuarios.routes'));

router.use(require('./auth.routes'));

module.exports = router;