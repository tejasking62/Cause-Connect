const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

app.post('/webhook', async (req, res) => {
    try {
        const formResponse = req.body;

        await pool.query(
            'INSERT responses ($1)',
            [JSON.stringify(formResponse)]
        );

        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});