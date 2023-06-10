import React, { useEffect, useState } from 'react'
import { All_PRODUCTS, GET_ALL_CATEGORY } from '../utility/constants';
import ShowCard from './ShowCard';
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from '../utility/dataSlice';
import store from '../utility/store';
import ShimmerCard from './ShimmerCard';
import { Link } from 'react-router-dom';
import { dollertoinr, shuffleArray } from '../utility/utility';
import filtericon from '..//../assets/images/filter.png'
export default function Body() {



    const [product, setProducts] = useState([]);
    const [filtertab, setFilterTab] = useState(false);
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState(100000)
    const [filterStatus, setFilterStatus] = useState(false)
    const [preLi, setPreLi] = useState('');
    const dispatch = useDispatch()
    const stored_data = useSelector(store => store?.products?.items);



    useEffect(() => {
        if (stored_data.length > 0) {
            setProducts(stored_data)
            getAllCategory()

            setLoading(false)
        } else {
            getAllProduct()
            getAllCategory()
            setLoading(false)
        }


    }, [stored_data]);



    // fetching all category
    async function getAllCategory() {

        try {
            const res = await fetch(GET_ALL_CATEGORY);
            const json = await res.json()
            setCategory(json)
        } catch (error) {
            console.log('s' + error);
        }


    }

    // fetching data from api
    async function getAllProduct() {

        try {
            const res = await fetch(All_PRODUCTS);
            const json = await res.json()
            dispatch(storeData(json))
            setProducts(json)
        } catch (error) {
            console.log('s' + error);
        }


    }


    // set-perticular category
    function setcat(category_name, index) {
        if (category_name === 'all') {
            if (preLi.length > 1) {
                document.getElementById(preLi).style.fontWeight = '400';
            }
            document.getElementById('all_product').style.fontWeight = '600'
            setProducts(stored_data)
        } else {
            if (preLi.length > 1) {
                document.getElementById(preLi).style.fontWeight = '400';
            }
            document.getElementById('all_product').style.fontWeight = '400'
            document.getElementById(index).style.fontWeight = '600';
            setPreLi(index);
            let s = stored_data.filter((p) => p.category.includes(category_name))
            setProducts(s)
        }
    }

    useEffect(() => {
        if (minPrice != 100000) {
            let data = product.filter((p) => dollertoinr(p.price) < minPrice)
            setProducts(data)
            setFilterStatus(true)
        }
    }, [minPrice])


    function setRating() {
        setFilterStatus(true)

        let abovefour = document.getElementById('check1');

        let abovethree = document.getElementById('check2');
        setProducts(stored_data)


        if (abovefour.checked && abovethree.checked == false) {
            let data = product.filter((p) => p.rating.rate > 4.5)
            setProducts(data)
        } else if (abovethree.checked && abovefour.checked == false) {
            let data = product.filter((p) => p.rating.rate > 3.5)
            setProducts(data)

        } else if (abovethree.checked && abovefour.checked) {
            setProducts(stored_data)


        } else {
            setProducts(stored_data)

        }

    }

    function clearFilter() {
        setMinPrice(100000)

        setProducts(stored_data)
        document.getElementById('check1').checked = false;
        document.getElementById('check2').checked = false;

        document.getElementById('randomly').selected = 'selected'
        setFilterStatus(false)
        setFilterTab(false)
        document.getElementById('filter_tag').style.fontWeight='400'


    }


    function ApplySort(e) {
        setFilterStatus(true)

        if (e !== undefined) {
            let IndexItem = document.getElementById('mySelect').selectedIndex;
            console.log(IndexItem);
            if (IndexItem == 1) {

                let lowtoHigh = product.slice().sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0);
                setProducts(lowtoHigh)
            } else if (IndexItem == 2) {
                let HighToLow = product.slice().sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
                setProducts(HighToLow)
            } else if (IndexItem == 0) {

                setProducts(shuffleArray(product))
            }
        }
    }

    // it changes filter text color onclick
    function filterColor(){
        if(filtertab){
            document.getElementById('filter_tag').style.fontWeight='400'
        }else{
            document.getElementById('filter_tag').style.fontWeight='600'

        }
    }


    if (loading==true) { return <ShimmerCard /> }
    else {

        return (

            <section>
                <section className='px-[10%] mt-6 mb-5 '>
               
                    <ul className='flex overflow-auto items-center py-[8px]'>
                        
                    <span onClick={() => setFilterTab(!filtertab)} className='cursor-pointer flex items-center   '>
                            <img src={filtericon} className='w-[18px] h-[18px]'/>
                            <span onClick={()=>filterColor()} id='filter_tag'>Filter</span>
                        </span>

                        <li onClick={() => setcat('all')} className='px-4 cursor-pointer max-[764px]:text-[12px] font-semibold whitespace-nowrap ml-4'
                            id='all_product'>all products</li>
                        {category?.map((p, index) => {
                            return <li onClick={() => setcat(p, 'list' + index)} className='px-4 whitespace-nowrap  cursor-pointer max-[764px]:text-[12px]' id={'list' + index} key={index}>{p}</li>
                        })}
                    </ul>


                    <hr />

                    {
                        filtertab == true ? <section className='flex items-center flex-wrap justify-evenly bg-slate-100 rounded-b-xl 
                          transition-all duration-[2s] p-[20px] '>
                            <div className='flex flex-col w-[300px]  p-[20px] m-4 relative'>
                                <p>Price Beetween</p>
                                <input type="range" min='0' max='100000' step="100" value={minPrice} className='cursor-pointer '
                                    onChange={(e) => { setMinPrice(e.target.value) }} />
                                <small>Price Selected 0 ₹ to {minPrice} ₹</small>

                            </div>

                            <div className='bg-slate-100'>
                                <label className='font-semibold mr-4'>Sort By</label>
                                <select onChange={(e) => ApplySort(e)} id="mySelect" className='bg-slate-100 border outline-none'>
                                    <option value={'random'} id='randomly'>Randomly</option>
                                    <option value={'low'}>Low to high Price</option>
                                    <option value={'high'}>High to Low Price</option>
                                </select>
                            </div>
                            <div className='flex flex-col '>
                                <label className='font-semibold'>Rating</label>
                                <section>
                                    <input type='checkbox' name='rating' id='check1' onChange={() => setRating()} />
                                    <label>4.5 and Above</label>

                                </section>
                                <section>
                                    <input type='checkbox' name='rating' id='check2' onChange={() => setRating()} />
                                    <label>3.5 and Above</label>

                                </section>
                            </div>
                            {filterStatus == true ? <button className='bg-blue-400 px-[10px] py-1 text-white rounded-lg' 
                            onClick={() => clearFilter()}>
                                Clear Filter</button> : null}
                        </section> : null
                    }
                </section>


                <section className='flex flex-wrap justify-center items-center mb-[60px] transition-all duration-[1s]'>

                    {product.map((p) => {

                        return <ShowCard info={p} key={p.id} />

                    })}
                </section>
            </section>
        )
    }
}
