"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePizza = exports.updatePizza = exports.getPizzaById = exports.createPizza = exports.getPizzas = void 0;
const pizza_1 = __importDefault(require("../models/pizza"));
const getPizzas = async (req, res) => {
    const filter = req.query;
    const pizza = await pizza_1.default.find(filter);
    if (pizza.length === 0) {
        return res.status(404).json({ error: 'no pizza found ,try again' });
    }
    return res.status(200).json(pizza);
};
exports.getPizzas = getPizzas;
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
const getPizzaById = async (req, res) => {
    const pizza = await pizza_1.default.findById(req.params.id);
    if (!pizza) {
        return res.status(404).json({ error: "pizza not found" });
    }
    return res.status(200).json(pizza);
};
exports.getPizzaById = getPizzaById;
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
const deletePizza = async (req, res) => {
    const pizza = await pizza_1.default.findById(req.params.id);
    if (!pizza) {
        return res.status(404).json({ error: 'Pizza not found' });
    }
    await pizza_1.default.findByIdAndDelete(req.params.id);
    return res.status(204).json();
};
exports.deletePizza = deletePizza;
