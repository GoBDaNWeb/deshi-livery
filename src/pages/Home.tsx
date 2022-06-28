// * react 
import React, {useState, useEffect, useRef} from 'react'
import qs from 'qs'
import {useNavigate} from 'react-router-dom'

// * redux 
import { useSelector} from 'react-redux'
import {useAppDispatch} from '../redux/store'
import {setFilters} from '../redux/filter/filterSlice'
import {fetchPizza} from '../redux/pizza/pizzaSlice'
import {selectFilter} from '../redux/filter/selectors'
import {selectPizza} from '../redux/pizza/selectors'

// * components
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import {Skeleton} from '../components/PizzaBlock/Skeleton'
import {sortList} from '../components/Sort'

type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const {categoryId, sortType, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizza)

    const fetch = async() => {
        try {
           
            const sortBy = sortType.sortProperty.replace('-', '')
            const category = categoryId > 0 ? String(categoryId) : ''
            const search = searchValue
            dispatch(fetchPizza({
                sortBy,
                category,
                search
            }))
        } catch(err) {

        }
    } 

    useEffect(() => {
        fetch()
    }, [categoryId, sortType.sortProperty, searchValue])
    
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">
                Все пиццы
            </h2>
            <div className="content__items">
                {
                    status === 'loading'
                    ? [...Array(8)].map((_, index) => (
                        <Skeleton key={index}/>
                    ))
                    : items?.map(item => (
                        <PizzaBlock key={item.id} {...item}/>
                    ))
                }
            </div>
        </>
    )
}

export default Home