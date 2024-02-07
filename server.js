const app = require('./index');
const dotenv= require('dotenv');
dotenv.config()
const port = process.env.PORT || 3000;
const createDb = require('./config/createDb')

createDb().then(()=>{
  
  const sequelize = require('./models/index');
  sequelize.sync({alter: true}).then(() => {
    console.log('Database synced!');
  
    app.listen(port, async() => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }).catch((error) => {
    console.error('Unable to sync database:', error);
    return error
  });
})
.catch((err)=>{
  console.log(err);
  process.exit(1);
})

  