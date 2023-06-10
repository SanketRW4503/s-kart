


export const dollertoinr=(dolller)=>{
    return Math.round(dolller*82.53)

}


export const shuffleArray=(array)=>{

    let shuffledArray=[]
    let usedIndex=[];


    let i=0;
    while(i!==array.length){

        let randomNumber = Math.floor(Math.random()*array.length);
        
        if(!usedIndex.includes(randomNumber)){
            shuffledArray.push(array[randomNumber]);
            usedIndex.push(randomNumber)
            i++
        }

        

    }

return shuffledArray;

}