import express, {Request,Response} from 'express';
import Pizza from '../models/pizza';
import pizza from '../models/pizza';
/**
* @swagger
* /api/v1/pizzas:
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
export const getPizzas =async (req:Request,res:Response) => {
    const filter = req.query;

    const pizzas =await Pizza.find(filter);

    if (pizza.length ===0) {
        return res.status(404).json ({ error: 'no pizza found ,try again'});
    }

    return res.status(200).json(pizza);
}

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
*                 required:true
*                 type:number
*     responses:
*       201:
*         description: Pizza created
*       400:
*         description: Bad request
*/

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

export const getPizzaById = async (req:Request, res:Response) => {
    const pizza = await Pizza.findById (req.params.id);
    if (!pizza) {
        return res.status(404).json ({ error : "pizza not found"});

    }
    
    return res.status(200).json(pizza);
};

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

export const updatePizza =async (req:Request,res:Response) => {
    const pizza = await Pizza.findById (req.params.id);

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

/**
* @swagger
* /api/v1/pizzas/{id}:
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

export const deletePizza = async (req: Request, res: Response) => {
  const pizza = await Pizza.findById(req.params.id);

  if (!pizza) {
    return res.status(404).json({ error: 'Pizza not found' });
  }

  await Pizza.findByIdAndDelete(req.params.id);

  return res.status(204).json();
};
