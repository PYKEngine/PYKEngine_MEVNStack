const mongoose = require("mongoose")

const connectToDB = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, error => {
    if (error) {
      console.log('Unable to connect to database');
      throw error;
    } else {
      console.log('Interface 2037 Ready for inquery!');
    }
  });
}

module.exports = connectToDB