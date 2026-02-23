import mongoose , {Model,Schema} from 'mongoose';
interface Ipizza {
   name:string;
   size:string;
   crust:string;
   toppings:string;
   price: Number; 
}

const PizzaSchema = new Schema<Ipizza>({
    name:{
        type:String,
        required:[true,'pizza name required'],
    },

    size: {
        type: String
    },

    crust: {
        type: String
    },

    price: {
        type: Number,
        required:[true,'price required']
    }
});

const pizza = mongoose.model<Ipizza>('pizza',PizzaSchema);
export default pizza;