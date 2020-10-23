const Post = require('../models/Post');

exports.crearPost = async (req, res) => {
    
    try {
        // Crear un nuevo post
        const post = new Post(req.body);

        // Guardar el creador via JWT
        post.creador = req.usuario.id;

        // Guardamos el post
        post.save();
        res.json(post);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtiene todos los posts del usuario actual
exports.obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ creado: -1 });
        res.json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Obtiene un post
exports.obtenerPost = async (req, res) => {
    try {
        const post = await Post.find({ _id: req.params.id });
        res.json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Actualiza un post
exports.actualizarPost = async (req, res) => {

    // Extraer la información del post
    const { titulo, texto, autor, imagen, fecha, categoria } = req.body;
    const nuevoPost = {};

    if (titulo) nuevoPost.titulo = titulo;
    if (texto) nuevoPost.texto = texto;
    if (autor) nuevoPost.autor = autor;
    if (imagen) nuevoPost.imagen = imagen;
    if (fecha) nuevoPost.fecha = fecha;
    if (categoria) nuevoPost.categoria = categoria;

    try {

        // revisar el ID
        let post = await Post.findById(req.params.id);

        // Si el post existe o no
        if(!post) {
            return res.status(404).json({msg: 'Post no encontrado'});
        }

        // Actualizar
        post = await Post.findOneAndUpdate({ _id: req.params.id }, { $set: nuevoPost }, { new: true });

        res.json({ post });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}

// Elimina un post por su ID
exports.eliminarPost = async (req, res) => {
    try {
        // revisar el ID
        let post = await Post.findById(req.params.id);

        // Si el post existe o no
        if(!post) {
            return res.status(404).json({msg: 'Post no encontrado'});
        }

        // Eliminar el Post
        await Post.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Post eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}