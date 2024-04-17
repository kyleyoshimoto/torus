const express = require('express');
const axios = require('axios');
const app = express();

app.get('/spotify-data', async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]; // Extract access token from Authorization header
        const response = await axios.get('https://api.spotify.com/v1/audio-features', {
            params: {
                ids: req.query.ids
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Spotify data:', error);
        res.status(500).send('Error fetching Spotify data');
    }
});

app.listen(3001, () => {
    console.log('Proxy server running on port 3001');
});
