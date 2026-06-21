const errorHandler = (err, req, res, next) => {
  console.log("Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Something went wrong on server"
  });
};

module.exports = errorHandler;