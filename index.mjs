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
   // let randomImage = data.hits[0].webformatURL
   let randomIndex = Math.floor(Math.random() * 50) + 1
   let randomImage = data.hits[randomIndex].webformatURL
   res.render('home.ejs', {randomImage})
});

// planet route
app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName; // matches the attribute in nav.ejs
   let planetInfo = solarSystem[`get${planet_name}`]();
   //console.log(planetInfo);
   res.render('planetInfo.ejs', {planetInfo, planet_name});
});

// rocks route
app.get('/rocks', (req, res) => {
   let rockName = req.query.rockName; // matches the attribute in nav.ejs
   let rockInfo = solarSystem[`get${rockName}`]();
   res.render('rocks.ejs', {rockInfo, rockName});
});

app.get('/nasapod', (req, res) => {
   res.render('nasapod.ejs')
})

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