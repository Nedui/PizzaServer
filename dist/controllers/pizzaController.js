"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePizza = exports.updatePizza = exports.getPizzaById = exports.createPizza = exports.getPizzas = void 0;
const pizza_1 = __importDefault(require("../models/pizza"));
/**
* @swagger
* /api/v1/pizza:
*   get:
*     tags:
*     - Pizza
*     summary: Retrieve all pizza
*     responses:
*       200:
*         description: A list of pizzas
*       404:
*         description: No pizza found
*/
const getPizzas = async (req, res) => {
    const filter = req.query;
    const pizza = await pizza_1.default.find(filter);
    if (pizza.length === 0) {
        return res.status(404).json({ error: 'no pizza found ,try again' });
    }
    return res.status(200).json(pizza);
};
exports.getPizzas = getPizzas;
/**
* @swagger
* /api/v1/pizzas:
*   post:
*     tags:
*     - Pizza
*     summary: Create a new pizza
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 required: true
*                 type: string
*               size:
*                 required: true
*                 type: string
*             price:
*            required:true
*           type:number
*     responses:
*       201:
*         description: Pizza created
*       400:
*         description: Bad request
*/
const createPizza = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' });
    }
    try {
        await pizza_1.default.create(req.body);
        return res.status(201).json();
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.createPizza = createPizza;
/**
* @swagger
* /api/v1/pizzas/{id}:
*   get:
*     tags:
*     - Pizza
*     summary: Retrieve a pizza by ID
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Pizza found
*       404:
*         description: Pizza not found
*/
const getPizzaById = async (req, res) => {
    const pizza = await pizza_1.default.findById(req.params.id);
    if (!pizza) {
        return res.status(404).json({ error: "pizza not found" });
    }
    return res.status(200).json(pizza);
};
exports.getPizzaById = getPizzaById;
/**
* @swagger
* /api/v1/pizzas/{id}:
*   put:
*     tags:
*     - Pizza
*     summary: Update a pizza by ID
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               size:
*                 type: string
*               price:
*                 type: number
*     responses:
*       204:
*         description: Updated successfully
*       404:
*         description: Pizza not found
*/
const updatePizza = async (req, res) => {
    const pizza = await pizza_1.default.findByIdAndUpdate(req.params.id);
    if (!pizza) {
        return res.status(404).json({ 'error': 'pizza not found' });
    }
    try {
        pizza.set(req.body);
        await pizza.save();
        return res.status(204).json();
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.updatePizza = updatePizza;
/**
* @swagger
* /api/v1/movies/{id}:
*   delete:
*     tags:
*     - Pizza
*     summary: Delete a pizza by ID
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       204:
*         description: Deleted successfully
*       404:
*         description: Pizza not found
*/
const deletePizza = async (req, res) => {
    const pizza = await pizza_1.default.findById(req.params.id);
    if (!pizza) {
        return res.status(404).json({ error: 'Pizza not found' });
    }
    await pizza_1.default.findByIdAndDelete(req.params.id);
    return res.status(204).json();
};
exports.deletePizza = deletePizza;
