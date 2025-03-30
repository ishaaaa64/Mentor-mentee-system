// errorHandler.js

export const handleValidationError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  };
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (res.headersSent) {
      return next(err); // ✅ Prevent sending headers again
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, message });
  };
  