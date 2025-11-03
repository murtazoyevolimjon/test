import {Router} from "express";
import {validation} from "../middleware/validation";
import {orderWithItemsValidation, orderWithItemsUpdate} from "../validations/order.validation";
import {authGuard} from "../middleware/authGuard";
import {roleGuard} from "../middleware/roleGuard";
import {withLogger} from "../utils/withLogger";

import {OrderController} from "../controllers/order.controller";

const router = Router();

router.get('/', authGuard, roleGuard(['manager', 'admin', 'staff','customer']), withLogger(OrderController.getAll, `OrderController.getAll`));
router.get('/:id', authGuard, roleGuard(['manager', 'admin', 'staff', 'customer']), withLogger(OrderController.getOne, `OrderController.getOne`));
router.post('/', authGuard, roleGuard(['customer']), validate(orderWithItemsValidate),  withLogger(OrderController.createOne, `OrderController.createOne`));
router.put('/:id', authGuard,  roleGuard(['customer']), validate(orderWithItemsUpdate), withLogger(OrderController.updateOne, `OrderController.updateOne`));
router.delete('/:id', authGuard, roleGuard(['manager', 'admin', 'customer']), withLogger(OrderController.deleteOne, `OrderController.deleteOne`));

export { router as orderRouter };