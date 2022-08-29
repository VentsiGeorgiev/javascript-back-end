const express = require('express');

const data = [
    {
        id: 'asdf0001',
        name: 'First',
        color: 'blue',
    },
    {
        id: 'asdf0002',
        name: 'Second',
        color: 'blue',
    },
    {
        id: 'asdf0003',
        name: 'Third',
        color: 'blue',
    },
];

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'mf' }));

app.get('/api/catalog', (req, res) => {
    res.json(data);
});

app.post('/api/catalog', (req, res) => {
    const id = 'asdf' + (Math.random() * 9999 | 0);
    req.body.id = id;
    data.push(req.body);

    res.json(req.body);
});

app.get('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    const record = data.find(r => r.id == id);
    res.json(record);
});

app.put('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    let index;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
            break;
        }
    }
    req.body.id = id;
    data[index] = req.body;

    res.json(data[index]);
});

app.delete('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    let index;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
            break;
        }
    }
    data.splice(index, 1);

    res.status(204).end();
});

app.listen(3000, () => console.log('Server started on port 3000'));