const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Crea posts
// api/posts
router.post('/',
    auth,
    postController.crearPost
);

// Obtener un post
router.get('/:id',
    auth,
    postController.obtenerPost
);

// Obtener todos los posts
router.get('/',
    auth,
    postController.obtenerPosts
);

// Actualizar post via ID
router.put('/:id',
    postController.actualizarPost
);

// Eliminar un post
router.delete('/:id',
    auth,
    postController.eliminarPost
);

module.exports = router;