// * react 
import React, {useState, useEffect, useRef} from 'react'
import qs from 'qs'
import {useNavigate} from 'react-router-dom'

// * redux 
import { useSelector} from 'react-redux'
import {useAppDispatch} from '../redux/store'
import {setFilters} from '../redux/filter/filterSlice'
import {fetchDishes} from '../redux/dishes/dishesSlice'
import {selectFilter} from '../redux/filter/selectors'
import {selectDishes} from '../redux/dishes/selectors'

// * components
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import DishesBlock from '../components/DishesBlock'
import {Skeleton} from '../components/DishesBlock/Skeleton'

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const {categoryId, sortType, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectDishes)

    const fetch = async() => {
        try {
           
            const sortBy: string = sortType.sortProperty.replace('-', '')
            const category: string = categoryId > 0 ? String(categoryId) : ''
            const search: string = searchValue
            dispatch(fetchDishes({
                sortBy,
                category,
                search
            }))
        } catch(err) {

        }
    } 

    useEffect((): void => {
        fetch()
    }, [categoryId, sortType.sortProperty, searchValue])
    
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">
                Все Блюда
            </h2>
            <div className="content__items">
                {
                    status === 'loading'
                    ? [...Array(8)].map((_, index) => (
                        <Skeleton key={index}/>
                    ))
                    : items?.map(item => (
                        <DishesBlock key={item.id} {...item}/>
                    ))
                }
            </div>
        </>
    )
}

export default Home