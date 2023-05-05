const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }

  try {
    res.send(healthCheck);
  }
  catch (error) {
    healthCheck.message = error;
    res.status(503).send();
  }
})

module.exports = router;