// const xxRoutes = require('./xx');

const constructorMethod = (app) => {
  app.use('/', (req, res) => {
    res.status(400).json("Hello World!")
  }); 
  // app.use('/xx', xxRoutes);

  app.use('*', (req, res) => {
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
