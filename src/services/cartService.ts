import cartModel from "../models/cartModel";

interface CreatCartForUser{
    userId: string;
}

export const createCartForUser = async({userId}:CreatCartForUser) =>{
    const cart = await cartModel.create({userId, totalAmount:0})
    await cart.save();
    return cart;
}


interface GetActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async({userId}:GetActiveCartForUser ) =>{
    let cart = await cartModel.findOne({userId, status: "active"}).populate('items');
    if(!cart){
        cart = await createCartForUser({userId});
    }
    return cart;

}