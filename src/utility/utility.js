





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

        const res = await fetch(process.env.DELETE_ITEM_FROM_CART, {
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

        const res = await fetch(process.env.REMOVE_ITEM_FROM_CART, {
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
        const res = await fetch(process.env.ADD_ITEM_TO_CART, {
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