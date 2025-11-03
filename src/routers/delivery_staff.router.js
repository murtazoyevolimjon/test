import { Router } from "express";
import { validation } from "../middleware/validation";
import { authGuard } from "../middleware/authGuard";
import { roleGuard } from "../middleware/roleGuard";
import { withLogger } from "../utils/withLogger";
import {
  deliveryStaffValidation,
  deliveryStaffupdate,
} from "../validations/delivery_staff.validation";

const router = Router();

router.get(
  "/",
  authGuard,
  roleGuard(["manager", "admin"]),
  withLogger(DeliveryStaffController.getAll, `DeliveryStaffController.getAll`),
);
router.get(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin"]),
  withLogger(DeliveryStaffController.getOne, `DeliveryStaffController.getOne`),
);
router.post(
  "/",
  roleGuard(["manager", "admin"]),
  validate(deliveryStaffValidate),
  withLogger(
    DeliveryStaffController.createOne,
    `DeliveryStaffController.createOne`,
  ),
);
router.put(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin"]),
  validate(deliveryStaffUpdate),
  withLogger(
    DeliveryStaffController.updateOne,
    `DeliveryStaffController.updateOne`,
  ),
);
router.delete(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin"]),
  withLogger(
    DeliveryStaffController.deleteOne,
    `DeliveryStaffController.deleteOne`,
  ),
);

export { router as deliveryStaffRouter };
