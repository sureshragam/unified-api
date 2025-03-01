require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 3000;  // Port number  3000 is used here but you can use any port number you want to use

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  