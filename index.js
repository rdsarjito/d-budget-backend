const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Setup MongoDB connection event listeners for visibility
const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected'));
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.on('disconnected', () => console.warn('MongoDB disconnected'));

mongoose.connect(keys.mongoURI);

require('./models/Income');
require('./models/Expense');
require('./models/Category');
require('./models/User');

const incomeRoutes = require('./routes/income');
const expenseRoutes = require('./routes/expense');
const categoryRouters = require('./routes/category');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/income', incomeRoutes);
app.use('/expense', expenseRoutes);
app.use('/category', categoryRouters);
app.use('/user', userRoutes);

// Health endpoint to check DB connection state
// readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
app.get('/health', (req, res) => {
  res.json({ dbReadyState: mongoose.connection.readyState });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT);

console.log(`Server Running on Port: http://localhost:${PORT}`);