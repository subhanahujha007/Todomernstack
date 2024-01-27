import { Router } from "express";
import { registerroute,deleteTask,loginroute,createtask,sendtask, updateTask } from "../controllers/Usercontrollers.js";
const router=Router()

router.route("/login").post(loginroute)
router.route("/register").post(registerroute)
router.route("/createtask").post(createtask)
router.route("/gettask").get(sendtask)
router.route("/deletetask/:id").delete(deleteTask)
router.route("/updatetask/:id").post(updateTask)
export default router
