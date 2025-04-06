require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let model;
try{
  const modelData = fs.readFileSync('./model.json', 'utf-8');
  model = JSON.parse(modelData);
  console.log('Model loaded successfully');
} catch (error) {
  console.error('Error loading model:', error.message);
}

app.get('/', (req, res) =>{
    res.send('Resale Price Estimator API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function calculateResalePrice(brand, category, originalPrice) {
  const brandTier = model.brandTiers[brand] || model.brandTiers['Other'];
  const categoryFactor = model.categoryFactors[category] || model.categoryFactors['Other'];

  const resalePrice = originalPrice * brandTier * categoryFactor;

  return resalePrice.toFixed(2);
}

  app.post('/api/estimate', (req, res) => {
    try{
        const  { brand, category, originalPrice } = req.body;
        if (!brand || !category || !originalPrice) {
            return res.status(400).json({ error: 'Please ensure all fields are provided: brand, category, and original price are required.' });
        }

        const price = parseFloat(originalPrice);
        if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
            error: 'Original price must be a positive number' 
        });
        }

        const estimatedResalePrice = calculateResalePrice(brand, category, price);

        return res.json({
            originalPrice: price,
            estimatedResalePrice,
            brand,
            category,
            brandFactor: model.brandTiers[brand] || model.brandTiers['Other'],
            categoryFactor: model.categoryFactors[category] || model.categoryFactors['Other']
          });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', message: error.message });
    }
  });