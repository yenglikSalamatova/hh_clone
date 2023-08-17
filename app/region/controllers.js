const City = require("./City");
const Country = require("./Country");

const getCities = async (req, res) => {
  const cities = await City.findAll();
  res.status(200).json({ cities });
};

const getCountries = async (req, res) => {
  const countries = await Country.findAll();
  res.status(200).json({ countries });
};

module.exports = {
  getCities,
  getCountries,
};
