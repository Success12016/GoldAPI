const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const dataUrl = 'http://www.thaigold.info/RealTimeDataV2/gtdata_.txt';

    try {
        const response = await axios.get(dataUrl);
        const data = response.data;

        console.log('Data from API:', data);

        const pricePerGram = parseFloat(data[5]?.bid); // ราคาเสนอซื้อของทองคำ 96.5%

        if (isNaN(pricePerGram)) {
            console.error('pricePerGram is not a valid number:', pricePerGram);
            res.status(500).send('Invalid price data from API');
            return;
        }

        // คำนวณราคาทองคำตามน้ำหนักต่างๆ
        const prices = {
            halfSalung: pricePerGram * 3.81 / 15.244 / 2,
            oneSalung: pricePerGram * 3.81 / 15.244,
            twoSalung: pricePerGram * 3.81 * 2 / 15.244,
            oneBaht: pricePerGram,
            twoBaht: pricePerGram * 2,
            threeBaht: pricePerGram * 3
        };

        const updateTime = data[0]?.ask; // เวลาที่แสดงในดัชนีที่ [0] และคีย์ 'ask'

        res.render('index', { prices, updateTime });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
