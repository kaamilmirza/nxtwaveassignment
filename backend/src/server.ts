import express from 'express';
import sequelize from './db';
import gatewayRouter from './routes/gateway';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    app.use('/api', gatewayRouter);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
