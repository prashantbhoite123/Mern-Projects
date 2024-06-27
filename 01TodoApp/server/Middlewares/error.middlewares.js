export const errorMiddleware = (err, req, res, next) => {
  const statuscode = err.statuscode || 500
  const message = err.message || "Internal Server Error "
  return res.status(statuscode).json({ success: false, message })
}
