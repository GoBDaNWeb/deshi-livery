// * react
import React, {memo} from 'react'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import { setCategoryId } from '../redux/filter/filterSlice';
import {selectFilter} from '../redux/filter/selectors'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Десерты', 'Морепродукты'];

const Categories: React.FC = memo(() => {
    const dispatch = useDispatch()
    const {categoryId} = useSelector(selectFilter)

    return (
        <div className='categories'>
            <ul>
                {
                    categories.map((category, index) => (
                        <li 
                            onClick={() => dispatch(setCategoryId(index))}
                            className={`${categoryId === index ? 'active' : ''}`}
                            key={index}
                        >
                            {category}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})

export default Categories