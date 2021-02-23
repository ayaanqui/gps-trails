const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    return res.send({
        message: "Welcome to the GPS Trails API"
    });
});

app.get('/trails', (req, res) => {
    return res.send("Noob")
});

app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});