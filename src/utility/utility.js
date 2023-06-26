import { ADD_CARTITEM_TOCART, delete_item_from_mongodb_cart, remove_item_from_Mongodb_cart } from "./constants";






// Shuffle the array 
export const shuffleArray = (array) => {

    let shuffledArray = []
    let usedIndex = [];


    let i = 0;
    while (i !== array.length) {

        let randomNumber = Math.floor(Math.random() * array.length);

        if (!usedIndex.includes(randomNumber)) {
            shuffledArray.push(array[randomNumber]);
            usedIndex.push(randomNumber)
            i++
        }



    }

    return shuffledArray;

}


// it delete whole cart item from mongodb database
export const deleteitem_from_Mongodb = async (item, userdata) => {
    let dataset = {
        userid: userdata.profile._id,
        _id: item._id
    }
    dataset = JSON.stringify(dataset);
    try {

        const res = await fetch(delete_item_from_mongodb_cart, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: dataset
        });

        const json = await res.json()
    } catch (error) {
        console.log(error);

    }

}

//remove one cart item to mongodb database 
export const remove_item_mongoDb_cart = async (item, userdata) => {


    let dataset = {
        userid: userdata.profile._id,
        _id: item._id
    }
    dataset = JSON.stringify(dataset);

    try {

        const res = await fetch(remove_item_from_Mongodb_cart, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: dataset
        });

        const json = await res.json()
    } catch (error) {
        console.log(error);
    }
}


// add cart item to mongodb database 
export const add_mongoDb_cart = async (productdata, userdata) => {


    let dataset = {
        userid: userdata.profile._id,
        products: [{
            title: productdata.title,
            quantity: 1,
            price: productdata.price,
            rating: productdata.rating,
            imageUrl: productdata.imageUrl,
            category: productdata.category,
            description: productdata.description,
            _id: productdata._id
        }]
    }

    dataset = JSON.stringify(dataset);

    try {
        const res = await fetch(ADD_CARTITEM_TOCART, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: dataset
        });

        const json = await res.json()

    } catch (error) {
        console.log(error);
    }

}