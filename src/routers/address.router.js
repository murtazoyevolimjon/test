import { Router } from "express";
import { validation } from "../middleware/validation";
import { authGuard } from "../middleware/authGuard";
import { roleGuard } from "../middleware/roleGuard";
import { withLogger } from "../utils/withLogger";
import {
  addressValidation,
  addressUpdate,
} from "../validations/address.validation";
import { AddressController } from "../controllers/address.controller";

const router = Router();

router.get(
  "/",
  authGuard,
  roleGuard(["manager", "admin", "staff", "customer"]),
  withLogger(AddressController.getAll, `AddressController.getAll`),
);
router.get(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin", "staff", "customer"]),
  withLogger(AddressController.getOne, `AddressController.getOne`),
);
router.post(
  "/",
  authGuard,
  roleGuard(["customer"]),
  validation(addressValidation),
  withLogger(AddressController.createOne, `AddressController.createOne`),
);
router.put(
  "/:id",
  authGuard,
  roleGuard(["customer"]),
  validation(addressUpdate),
  withLogger(AddressController.updateOne, `AddressController.updateOne`),
);
router.delete(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin", "customer"]),
  withLogger(AddressController.deleteOne, `AddressController.deleteOne`),
);

export { router as addressRouter };
