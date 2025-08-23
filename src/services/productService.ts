import productModel from "../models/productModel";


export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    const products =[
        { title: "one appartment in Emmar Tower", image: "WhatsApp Image 2025-08-08 at 17.46.23_e42cba5f.jpg", price: 250000, stock: 10},
    ]

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
        await productModel.insertMany(products);

    }
}




