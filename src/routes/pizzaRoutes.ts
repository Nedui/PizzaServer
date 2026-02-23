import express, {Router} from "express";

import{createPizza,getPizzas,getPizzaById,updatePizza,deletePizza} from '../controllers/pizzaController';

const router: Router = express.Router();

Router.get('/',getPizzas);;
Router.post('/',createPizza);
Router.get('/:id',getPizzaById);
Router.put('/:id',updatePizza);
Router.delete('/:id',deletePizza);

export default Router;