"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pizzaController_1 = require("../controllers/pizzaController");
const router = express_1.default.Router();
router.get('/', pizzaController_1.getPizzas);
router.post('/', pizzaController_1.createPizza);
router.get('/:id', pizzaController_1.getPizzaById);
router.put('/:id', pizzaController_1.updatePizza);
router.delete('/:id', pizzaController_1.deletePizza);
exports.default = router;
