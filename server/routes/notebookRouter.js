const Router = require("express");
const router = new Router();
const notebookController = require("../controllers/notebookController");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/get", authMiddleware, notebookController.get);
router.put("/set", authMiddleware, notebookController.set);

module.exports = router;