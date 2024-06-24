const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const dataUrl = 'http://www.thaigold.info/RealTimeDataV2/gtdata_.txt';

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(dataUrl);
        const data = await response.json();

        res.render('index', { data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


