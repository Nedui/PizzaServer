import express, {Router} from "express";

import{createPizza,getPizzas,getPizzaById,updatePizza,deletePizza} from '../controllers/pizzaController';

const router: Router = express.Router();

router.get('/',getPizzas);
router.post('/',createPizza);
router.get('/:id',getPizzaById);
router.put('/:id',updatePizza);
router.delete('/:id',deletePizza);

export default router;