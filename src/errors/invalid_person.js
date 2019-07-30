// Handling an invalid person object
module.exports = (error, request, response, next) => {
    console.log("Error middleware: ", error.message);
    // pseudo typechecking of error
    if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }
    // if it's not a (schema) validation error, this middleware passes it to express's default error handling function
    next(error);
  };  