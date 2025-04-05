require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('Resale Price Estimator API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Pricing data
const brandTiers = {
    'Gucci': 0.6,
    'Prada': 0.65,
    'Louis Vuitton': 0.7,
    'Chanel': 0.75,
    
    'Calvin Klein': 0.45,
    'Tommy Hilfiger': 0.4,
    'Ralph Lauren': 0.45,
    'Michael Kors': 0.35,
    
    'Zara': 0.25,
    'H&M': 0.2,
    'Forever 21': 0.15,
    'ASOS': 0.22,
    
    // Default
    'Other': 0.3
  };
  
  const categoryFactors = {
    'Outerwear': 0.65, // Coats, jackets, etc.
    'Dresses': 0.55,
    'Jeans': 0.5,
    'Tops': 0.4,
    'T-shirts': 0.3,
    'Skirts': 0.45,
    'Sweaters': 0.5,
    'Activewear': 0.45,
    // Default
    'Other': 0.4
  };

  function calculateResalePrice(brand, category, originalPrice) {
    const brandTier = brandTiers[brand] || brandTiers['Other'];
    const categoryFactor = categoryFactors[category] || categoryFactors['Other'];
  
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
            brandFactor: brandTiers[brand] || brandTiers['Other'],
            categoryFactor: categoryFactors[category] || categoryFactors['Other']
          });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', message: error.message });
    }
  });