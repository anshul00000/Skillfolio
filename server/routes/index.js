const express = require('express');
const router = express.Router();
const connectdb = require('../database/db_connect');
let connect_db;
const conect_fun = async () => {
  connect_db = await connectdb();
  console.log(connect_db);
}
conect_fun();
// Import route modules
const authRoutes = require('./auth');
const otpRoutes = require('./otp');
const contactRoutes = require('./contact');
const userRoutes = require('./user');
const projectRoutes = require('./project');
// Home route
router.get('/', async (req, res) => {
  await conect_fun();
  if (connect_db) {
    res.json({ message: "true" });
  } else {
    res.json({ message: "false" });
  }
});
// Use route modules
router.use('/', authRoutes);
router.use('/', otpRoutes);
router.use('/contact', contactRoutes);
router.use('/', userRoutes);
router.use('/', projectRoutes);
module.exports = router;