import express from 'express';
import productoRouter from './src/routes/producto.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, resp) => {
    return resp.json({ mensaje: "Hola mundo", code: 200});
})

app.use('/producto', productoRouter);

app.listen(3005, () => {
    console.log('Server is running on port 3005');
})