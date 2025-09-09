import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./productModel";


const CartStatusEnum = ["active", "completed"] 

export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}


export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  totalAmount: number;
  status : "active" | "completed" ;
}


const cartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
})

const cartSchema = new Schema<ICart>({
    userId: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    totalAmount: { type: Number, required: true},
    status: { type: String, enum: CartStatusEnum, default: "active" }
});

const cartModel = mongoose.model<ICart>("Cart", cartSchema);
export default cartModel;
