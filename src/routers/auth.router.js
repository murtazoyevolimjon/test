import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { validation } from "../middleware/validation";
import { loginValidation } from "../validations/auth.validation";
import { login } from "../controllers/auth.controller";
import { withLogger } from "../utils/withLogger";
import { registerValidation } from "../validations/auth.validation";
import { profile, refreshAccess } from "../controllers/auth.controller";
import { authGuard } from "../middleware/authGuard";

//Login
export const loginRouter = Router();
loginRouter.post("/", validation(loginValidate), withLogger(login, `login`));

//Register
export const registerRouter = Router();
registerRouter.post(
  "/",
  validation(registerValidation),
  withLogger(register, `register`),
);

//Profile
export const profileRouter = Router();
profileRouter.get("/", authGuard, withLogger(profile, `profile`));

//& Refresh Tokens
export const refreshRouter = Router();
refreshRouter.post("/", withLogger(refreshAccess, `refreshAccess`));
