const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');
const connectDB = require('./src/config/DB');

// Connect to the database
connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('Error starting server:', error);
});