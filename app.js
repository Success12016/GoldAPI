/*const express = require('express');
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
*/
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://www.goldapi.io/api/XAU/THB', {
            headers: {
                'x-access-token': 'goldapi-108le9slxt7933c-io',
                'Content-Type': 'application/json'
            }
        });
        const goldPrice = response.data;

        res.render('index', { goldPrice });
    } catch (error) {
        console.error(error);
        res.render('index', { goldPrice: null });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
