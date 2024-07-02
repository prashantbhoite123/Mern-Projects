export const errorMiddleware = (err, req, res, next) => {
  const statuscode = err.statuscode || 500
  const message = err.message || "Internal server error"
  return res.status(statuscode).json({ success: false, message })
}
