function generateUniqueId() {
  const timestamp = new Date().getTime() // Current timestamp
  const random = Math.random().toString(36).substring(2, 8) // Random string
  return `${timestamp}${random}`
}

export default generateUniqueId
