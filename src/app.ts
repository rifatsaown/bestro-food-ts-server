import cors from 'cors';
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { dbInstance } from './middleware/dbInstance';

const app = express();

/*------------ Middlewares --------------*/
app.use(cors());
app.use(express.json());
app.use(dbInstance);

/*------------ Home Routes --------------*/
app.get("/", (req, res) => {
    const filePath = fs.readFileSync(
      path.join(__dirname, "../public/index.html"),
      "utf8"
    );
    res.send(filePath);
  });

/*------------ JWT Routes --------------*/
app.post('/jwt', (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    res.send({ token });
})

/*----------- Import all Routes ------------*/
import cartRoutes from './routes/cartsRoutes';
import menuRoutes from './routes/menuRoutes';
import userRoutes from './routes/usersRoutes';
import utilsRoutes from './routes/utilsRoutes';

/*--------------- Route MiddleWare ---------------*/
app.use('/menu', menuRoutes);
app.use('/users', userRoutes);
app.use('/carts', cartRoutes);
app.use('/', utilsRoutes);


export default app;