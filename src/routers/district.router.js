import { Router } from "express";
import { validation } from "../middleware/validation";
import { withLogger } from "..//utils//withLogger";
import {
  districtValidation,
  districtUpdate,
} from "../validations/district.validation";
import { DistrictCotroller } from "../controllers/district.controller";
import { authGuard } from "../middleware/authGuard";
import { roleGuard } from "../middleware/roleGuard";

const router = Router();

router.get(
  "/",
  authGuard,
  roleGuard(["manager", "admin", "staff", "customer"]),
  withLogger(DistrictController.getAll, `DistrictController.getAll`),
);
router.get(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin", "staff", "customer"]),
  withLogger(DistrictController.getOne, `DistrictController.getOne`),
);
router.post(
  "/",
  authGuard,
  roleGuard(["customer"]),
  validate(districtValidate),
  withLogger(DistrictController.createOne, `DistrictController.createOne`),
);
router.put(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin", "customer"]),
  validate(districtUpdate),
  withLogger(DistrictController.updateOne, `DistrictController.updateOne`),
);
router.delete(
  "/:id",
  authGuard,
  roleGuard(["manager", "admin", "customer"]),
  withLogger(DistrictController.deleteOne, `DistrictController.deleteOne`),
);

export { router as districtRouter };
