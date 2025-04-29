const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Хранение товаров
let products = require('./products.json');

// Роуты API
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Настройка загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/api/products', upload.single('image'), (req, res) => {
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        category: req.body.category,
        price: parseFloat(req.body.price),
        image: '/uploads/' + req.file.filename
    };

    products.push(newProduct);
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

// Все остальные запросы
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});