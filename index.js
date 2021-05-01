const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyparser.urlencoded({extended: true }));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.listen(port, () => {
  console.log(`Aplikasi telah terkoneksi ke Port ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get("/kalkulatorbmi", (req, res) => {
    res.sendFile(__dirname + '/bmi' + '/index.html');
})

app.post('/kalkulatorbmi', (req, res) => {
    var tinggi = parseFloat(req.body.tinggi);
    var berat = parseFloat(req.body.berat);
    var bmi = berat / (tinggi * tinggi);

    bmi = bmi.toFixed();
  
    nama = req.body.nama;

    if (bmi < 19) {
        res.send("<h3>Perhatian!!! " + nama +
                 " Indeks Massa Tubuh Kamu: " + bmi +
                 "<centre><h1>Berat Badan Kamu Kurang!");
    } else if (19 <= bmi && bmi < 25) {
        res.send("<h3>Selamat!!! " + nama +
                 " Indeks Massa Tubuh Kamu: " + bmi +
                 "<centre><h1>Berat Badan Kamu Normal !");
    } else if (25 <= bmi && bmi < 30) {
        res.send("<h3>Perhatian!!! " + nama +
                 " Indeks Massa Tubuh Kamu: " + bmi +
                 "<centre><h1>Berat Badan Kamu Berlebihan!");
    } else {
        res.send("<h3>Perhatian!!! " + nama +
                 " Indeks Massa Tubuh Kamu: " + bmi +
                 "<centre><h1>Kamu Obesitas!");
    }
});
