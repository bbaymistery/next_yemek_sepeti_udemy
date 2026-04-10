export const errorHandler = (res, err) => {
  console.error("API Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    message: message,
    // Provide stack trace only in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
