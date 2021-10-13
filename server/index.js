const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();


const AnimeModel = require("./models/anime");


app.use(express.json());
app.use(cors());


mongoose.connect(
    "mongodb+srv://root:root@crud.b3tot.mongodb.net/anime",
    {
        useNewUrlParser: true,
    }
);

app.post('/insert', async (req, res) => {
    const animeName = req.body.animeName
    const animeGenre = req.body.animeGenre

    const anime = new AnimeModel( {animeName: animeName, animeGenre: animeGenre} );
    try {
        await anime.save();
        console.log("Data inserted");
    }
    catch (err){
        console.log(err);
    }
});

app.get('/read', async (req, res) => {
    AnimeModel.find({}, (err, result)=>{
        if(err){
            res.send(err);
        }

        res.send(result);

    })
});

app.put('/update', async (req, res) => {
    const newAnimeName = req.body.newAnimeName
    const id = req.body.id

    try {
        await AnimeModel.findById(id, (err, updatedAnime) => {
            updatedAnime.animeName = newAnimeName
            updatedAnime.save();
            res.send("Updated");
        });
    }
    catch (err){
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) =>{
    const id = req.params.id;
    console.log(id);
    await AnimeModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001.....");
});
