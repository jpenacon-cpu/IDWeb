const express = require('express');
const productRoutes = require('./routes/productRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const app = express();
app.use(express.json()); // Middleware incorporado JSON parser
// Middleware propio Logger
app.use((req, res, next) => {
console.log(`[${new Date().toISOString()}] ${req.method} en ${req.url}`);
next();
});
app.use('/api/v1/products', productRoutes);
app.use('/api/cursos', cursoRoutes);
app.listen(3000, () => console.log('API Express en puerto 3000'));