const app = require('./index');
const sequelize = require('./models/index');
const dotenv= require('dotenv');
dotenv.config()
const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database synced!');
  
    app.listen(port, async() => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }).catch((error) => {
    console.error('Unable to sync database:', error);
    return error
  });
  