const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode)
  err.statusCode = statusCode
  res.status(statusCode).json({
    success: false,
    message: req.t ? req.t(err.message) : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { errorHandler }
