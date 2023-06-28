import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store from '../utility/store';
import ShowCard from './ShowCard';
import { useParams } from 'react-router-dom';
import { shuffleArray } from '../utility/utility';
import filtericon from '..//../assets/images/filter.png'


export default function ViewProductPage() {

    const [products, setProducts] = useState([])
    const stored_data = useSelector(store => store?.products?.items);
    const params = useParams()
    const [minPrice, setMinPrice] = useState(100000)
    const [filterstatus, setFilterStatus] = useState(false)
    const [filterStyle, setFilterStyle] = useState({
        marginLeft: -100
    })
    const storedCategory = useSelector(store => store?.category?.items)

    useEffect(() => {
        if (stored_data?.length > 0) {
            setProducts(stored_data)
            console.log(products);
        }

    }, [stored_data]);

    useEffect(() => {
        if (storedCategory) {
            setuser_choosed_cat()
        }
    }, [storedCategory])

    function setuser_choosed_cat() {
        let checkbox = document.getElementById(params.id);
        if (checkbox) {
            checkbox.checked = true;
            if (params.id == 'viewAll') {
                setProducts(stored_data)
            }else{
            let s = stored_data.filter((p) => p.category == params.id)
            setProducts(s)
            }
        }
    }

    // sets category

    function setcat(category_name) {
        if (category_name == 'viewAll') {
            setProducts(stored_data)
        } else {
            let s = stored_data.filter((p) => p.category == category_name)
            setProducts(s)
        }
    }

    // this wil clear the filter
    function setClear() {
        setuser_choosed_cat()
        setMinPrice(100000)
        document.getElementById('randomly').selected = 'selected'

    }
    // filter sortby
    function ApplySort(e) {


        let IndexItem = document.getElementById('mySelect').selectedIndex;
        if (IndexItem == 1) {

            let lowtoHigh = products.slice().sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0);
            setProducts(lowtoHigh)
        } else if (IndexItem == 2) {
            let HighToLow = products.slice().sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
            setProducts(HighToLow)
        } else if (IndexItem == 0) {

            setProducts(shuffleArray(products))

        }

    }

    useEffect(() => {
        if (filterstatus == true) {
            setFilterStyle({ marginLeft: 0 })
        } else {
            setFilterStyle({ marginLeft: -280 })
        }
    }, [filterstatus])

    useEffect(() => {
        if (minPrice != 100000) {
            let data = products.filter((p) => p.price < minPrice)
            setProducts(data)
        }
    }, [minPrice])

    return (<div className='flex justify-between pr-[10px] ' >

        <div className=' flex items-center justify-center fixed z-10 '>

            <div style={filterStyle}
                className=' flex flex-col justify-left bg-slate-100 border  p-[20px] transition-all duration-1000'>
                <span className='flex items-center '>
                    <img src={filtericon} className='w-[18px] h-[18px] ' />
                    <label className='text-[22px] font-semibold '>Filter</label>
                </span>
                <div className='flex flex-col w-[200px]   mt-[20px] relative '>
                    <p className='font-semibold '>Price Range</p>
                    <input type="range" min='0' max='100000' step="100" value={minPrice} className='cursor-pointer  '
                        onChange={(e) => { setMinPrice(e.target.value) }} />
                    <small className=''>Price Selected 0 ₹ to {minPrice} ₹</small>

                </div>

                <div className='bg-slate-100  mt-[20px] '>
                    <label className='font-semibold '>Sort By</label>
                    <select onChange={(e) => ApplySort(e)} id="mySelect" className='bg-slate-100 border outline-none '>
                        <option value={'random'} id='randomly'>Randomly</option>
                        <option value={'low'}>Low to high Price</option>
                        <option value={'high'}>High to Low Price</option>
                    </select>
                </div>

                <div className='bg-slate-100 mt-[20px]  '>
                    <label className='font-semibold mr-4'>Selected Category</label>
                    {storedCategory ? storedCategory.map((c) => {

                        return <span className='flex'>
                            <input type='radio' id={c.category} name='la' onChange={() => setcat(c.category)} />{c.category}

                        </span>

                    }) : null

                    }
                    <input type='radio' id='viewAll' name='la' onChange={() => setcat('viewAll')} />View All Products

                </div>

                <button onClick={() => setClear()}
                    className='bg-blue-400 text-white rounded-md '>Clear Filter</button>
            </div>
            <button onClick={() => setFilterStatus(!filterstatus)}
                className='bg-slate-200 cursor-pointer ml-[-28px] z-10 font-semibold whitespace-nowrap
            px-[20px] rounded-md  h-[30px] rotate-90 border'>Filter Tab {filterstatus == true ? 'Open' : 'Close'}</button>
        </div>

        <div 
            className=' translate-[300px] w-[85%] m-[auto] transition-all duration-1000 flex flex-wrap justify-center items-center h-[max-700px] overflow-auto'>


            {products.length > 0 ? products.map((p) => {
                return <ShowCard info={p} key={p.id} detailsPage={true} />


            }) : null
            }
        </div>
    </div>
    )
}
