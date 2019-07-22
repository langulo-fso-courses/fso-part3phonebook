const Morgan = require('morgan');  // The request logger lib
const morgan = Morgan(':method :url :status :req[content-length] - :response-time ms - :jsonBody')

// morgan custom body token
Morgan.token('jsonBody', (req, res) => JSON.stringify(req.body))

// Export the custom configured Morgan instance
module.exports = morgan