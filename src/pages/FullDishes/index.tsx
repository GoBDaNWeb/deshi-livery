// * react
import React, {useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// * axios
import axios from 'axios';

type DishesItems = {
	id: string,
	imageUrl: string,
	title: string,
	price: number
}

const FullDishes: React.FC = () => {
	const [dish, setDish] = useState<DishesItems[]>()

	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect((): void => {
	async function fetch() {
		try {
		const { data } = await axios.get<DishesItems[]>('https://62b9cb2841bf319d2285a97b.mockapi.io/dishes?id=' + id);
		setDish(data);
		} catch (error) {
		alert('Ошибка при получении блюда!');
		navigate('/');
		}
	}
	
	fetch();
	}, []);

	if (!dish) {
		return <>Загрузка...</>;
	}
	
	return (
		<div className="container">
			<div className='full-dish'>
				<img src={dish[0].imageUrl} />
				<div className='full-dish-content'>
					<div>
						<h2>{dish[0].title}</h2>
						<h4>{dish[0].price} ₽</h4>
					</div>
					<Link to="/">
						<button className="button button--outline button--add">
							<span>
								Назад
							</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FullDishes;
