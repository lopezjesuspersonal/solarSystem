import express from 'express';
import fetch from 'node-fetch';
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// root route
app.get('/', async (req, res) => {
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system"
   let response = await fetch(url)
   let data = await response.json()
   // console.log(data)
   let randomImage = data.hits[0].webformatURL
   res.render('home.ejs', {randomImage})
});

// planet route
app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName; // matches the attribute in home.ejs
   let planetInfo = solarSystem[`get${planet_name}`]();
   //console.log(planetInfo);
   res.render('planetInfo.ejs', {planetInfo, planet_name});
});

// mercury route
// app.get('/mercury', (req, res) => {
//    let planetInfo = solarSystem.getMercury();
//    console.log(planetInfo);
//    res.render('mercury.ejs', {"planetInfo":planetInfo})
// });

// venus route
// app.get('/venus', (req, res) => {
//    let planetInfo = solarSystem.getVenus();
//    console.log(planetInfo);
//    res.render('mercury.ejs', {"planetInfo":planetInfo})
// });

app.listen(3000, () => {
   console.log('server started');
});