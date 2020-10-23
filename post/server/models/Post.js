const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    titulo: {
        type: String,
        require: true,
        trim: true
    },
    texto: {
        type: String,
        require: true,
        trim: true
    },
    autor: {
        type: String,
        require: true,
        trim: true
    },
    imagen: {
        type: String,
        require: true,
        trim: true
    },
    fecha: {
        type: String,
        require: true,
        trim: true
    },
    categoria: {
        type: String,
        require: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', PostSchema);