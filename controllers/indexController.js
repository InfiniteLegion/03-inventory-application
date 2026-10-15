const getHome = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(500).send(`Internal server error.\n${error}`);
  }
};

module.exports = { getHome };
