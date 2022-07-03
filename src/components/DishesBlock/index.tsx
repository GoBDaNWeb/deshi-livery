// * react
import React, {useState} from 'react'
import {Link} from 'react-router-dom'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {addItem} from '../../redux/cart/cartSlice'
import {selectCartItemById} from '../../redux/cart/selectors'

// * components 
import CustomImage from '../CastomImage'

type PizzaBlockProps = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({id, title, price, imageUrl, sizes, types}) => {
    const dispatch = useDispatch()
    const cartItem = useSelector(selectCartItemById(id))

    const cartItemCount = cartItem ? cartItem.repeatCount : 0

    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)
    const typeNames = ['обычное', 'острое🌶']

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            repeatCount: 0
        }

        dispatch(addItem(item))
    }

    return (
        <div className='dishes-block-wrapper'>
            <div className="dishes-block">
                <Link className='image' key={id} to={`/pizza/${id}`}>
                    <CustomImage imgSrc={imageUrl} pt='100%'/>               
                </Link>
                <h4 className="dishes-block__title">
                    {title}
                </h4>
                <div className="dishes-block__selector">
                    <ul>
                        {
                            types.map(typeId => (
                                <li 
                                    onClick={() => setActiveType(typeId)}
                                    key={typeId}
                                    className={`${activeType === typeId && 'active'}`}
                                >
                                    {typeNames[typeId]}
                                </li>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map((size, index) => (
                                <li
                                    onClick={() => setActiveSize(index)}
                                    key={index}
                                    className={`${activeSize === index && 'active'}`}
                                >
                                    {size} гр.
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="dishes-block__bottom">
                    <div className="dishes-block__price">
                        от {price} ₽
                    </div>
                    <button 
                        onClick={() => onClickAdd()}
                        className="button button--outline button--add"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                        </svg>
                        <span>
                            Добавить
                        </span>
                        <i>
                            {cartItemCount}
                        </i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock