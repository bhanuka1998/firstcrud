const mongoose = require('mongoose')

const AnimeSchema = new mongoose.Schema({
    animeName:{
        type: String,
        required: true,
    },
    animeGenre:{
        type: String,
        required: true,
    },
});

const Anime = mongoose.model("Anime", AnimeSchema)
module.exports = Anime