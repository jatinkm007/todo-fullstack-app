function errorHandler(err, req, res, next) {
  console.log("Error found:", err.message);

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid task id format"
    });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(function (item) {
      return item.message;
    });

    return res.status(400).json({
      success: false,
      message: messages[0]
    });
  }

  res.status(500).json({
    success: false,
    message: "Server error. Please try again later."
  });
}

module.exports = errorHandler;