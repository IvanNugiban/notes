const Router = require("express");
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.get("/get", noteController.get);
router.get("/getPined", authMiddleware, noteController.getPined);
router.get("/getNotePage", authMiddleware, noteController.getNotePage);
router.get("/getShared", authMiddleware, noteController.getSharedNotes)
router.post("/findUser", noteController.findUser );
router.post("/add", authMiddleware, noteController.add);
router.put("/change",  noteController.change);
router.delete("/deleteOne", noteController.deleteOne);
router.delete("/deleteAll", noteController.deleteAll)

module.exports = router;