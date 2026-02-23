import express, {Request,Response} from 'express';
import Pizza from '../models/pizza';
import pizza from '../models/pizza';

export const getPizzas =async (req:Request,res:Response) => {
    const filter = req.query;

    const pizza =await Pizza.find(filter);

    if (pizza.length ===0) {
        return res.status(404).json ({ error: 'no pizza found ,try again'});
    }

    return res.status(200).json(pizza);
}

export const createPizza =async (req:Request, res:Response) =>{
    if (!req.body) {
        return res.status(400).json({'error': 'Bad Request'});
    }

    try {
        await Pizza.create(req.body);
        return res.status(201).json();
    }
    catch (error) {
        return res.status(400).json ({error: error.message});
    }
};

export const getPizzaById = async (req:Request, res:Response) => {
    const pizza = await Pizza.findById (req.params.id);
    if (!pizza) {
        return res.status(404).json ({ error : "pizza not found"});

    }
    
    return res.status(200).json(pizza);
};


export const updatePizza =async (req:Request,res:Response) => {
    const pizza = await Pizza.findByIdAndUpdate (req.params.id);

    if (!pizza) {
        return res.status(404).json ({ 'error': 'pizza not found'});
    }

   try {
       pizza.set(req.body);
       await pizza.save();
       return res.status (204).json();
   }

   catch (error) {
    return res.status(400).json ({ error: error.message});
   }
};

export const deletePizza = async (req: Request, res: Response) => {
  const pizza = await Pizza.findById(req.params.id);

  if (!pizza) {
    return res.status(404).json({ error: 'Pizza not found' });
  }

  await Pizza.findByIdAndDelete(req.params.id);

  return res.status(204).json();
};
