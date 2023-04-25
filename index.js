const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MindsDB = require('mindsdb-js-sdk');

// Connect to the MindsDB cloud
(async () => {
    const connection = await MindsDB.connect({
      user: process.env.MINDS_DB_USER,
      password: process.env.MINDS_DB_PASSWORD
    
    });

    // Load the MindsDB model
    MindsDB.loadModel('bfpt_predict', connection).then(model => {
        console.log('Model loaded successfully!');
    }).catch(err => {
        console.error('Error loading model:', err);
    });
    
    // Parse JSON request bodies
    app.use(bodyParser.json());
    
    // Define the API route
    app.post('/predict', (req, res) => {
        const data = req.body;
    
        // Use the MindsDB model to predict the personality type
        model.predict({
        'EXT1': data.EXT1, 'EXT2': data.EXT2, 'EXT3': data.EXT3, 'EXT4': data.EXT4, 'EXT5': data.EXT5,
        'EXT6': data.EXT6, 'EXT7': data.EXT7, 'EXT8': data.EXT8, 'EXT9': data.EXT9, 'EXT10': data.EXT10,
        'EST1': data.EST1, 'EST2': data.EST2, 'EST3': data.EST3, 'EST4': data.EST4, 'EST5': data.EST5,
        'EST6': data.EST6, 'EST7': data.EST7, 'EST8': data.EST8, 'EST9': data.EST9, 'EST10': data.EST10,
        'AGR1': data.AGR1, 'AGR2': data.AGR2, 'AGR3': data.AGR3, 'AGR4': data.AGR4, 'AGR5': data.AGR5,
        'AGR6': data.AGR6, 'AGR7': data.AGR7, 'AGR8': data.AGR8, 'AGR9': data.AGR9, 'AGR10': data.AGR10,
        'CSN1': data.CSN1, 'CSN2': data.CSN2, 'CSN3': data.CSN3, 'CSN4': data.CSN4, 'CSN5': data.CSN5,
        'CSN6': data.CSN6, 'CSN7': data.CSN7, 'CSN8': data.CSN8, 'CSN9': data.CSN9, 'CSN10': data.CSN10,
        'OPN1': data.OPN1, 'OPN2': data.OPN2, 'OPN3': data.OPN3, 'OPN4': data.OPN4, 'OPN5': data.OPN5,
        'OPN6': data.OPN6, 'OPN7': data.OPN7, 'OPN8': data.OPN8, 'OPN9': data.OPN9, 'OPN10': data.OPN10
        }).then(result => {
        // Return the predicted personality type as a JSON response
        res.json({
            'personality_type': result.personality_type
        });
        }).catch(err => {
        console.error('Error predicting personality type:', err);
        res.status(500).send('Internal server error');
        });
    });
    
    // Start the server
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();