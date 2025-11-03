import { Router } from "express";
import { validation } from "../middleware/validation";
import { authGuard } from "../middleware/authGuard";
import { roleGuard } from "../middleware/roleGuard";
import { withlogger } from "../utils/withLogger";
import {
  customerValidation,
  customeUpdate,
} from "../validations/customer.validation";
import { CustomerController } from "../controllers/customer.controller";

const router = Router();

router.get(
  "/",
  authGuard,
  roleGuard(["manager", "admin"]),
  withLogger(CustomerController.getAll, `CustomerController.getAll`),
);
router.get(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin"]),
  withLogger(CustomerController.getOne, `CustomerController.getOne`),
);
router.post(
  "/",
  roleGuard(["customer"]),
  validate(customerValidate),
  withLogger(CustomerController.createOne, `CustomerController.createOne`),
);
router.put(
  "/:id",
  authGuard,
  roleGuard(["customer"]),
  validate(customerUpdate),
  withLogger(CustomerController.updateOne, `CustomerController.updateOne`),
);
router.delete(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin", "customer"]),
  withLogger(CustomerController.deleteOne, `CustomerController.deleteOne`),
);

export { router as customerRouter };
