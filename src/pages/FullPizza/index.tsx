// * react
import React, {useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// * axios
import axios from 'axios';

type PizzaItems = {
	id: string,
	imageUrl: string,
	title: string,
	price: number
}

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<PizzaItems>()

	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
	async function fetchPizza() {
		try {
		const { data } = await axios.get<PizzaItems>('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id);
		setPizza(data);
		} catch (error) {
		alert('Ошибка при получении пиццы!');
		navigate('/');
		}
	}

	fetchPizza();
	}, []);

	if (!pizza) {
		return <>Загрузка...</>;
	}
	console.log(pizza.id);
	
	return (
		<div className="container">
			<div className='full-pizza'>
				<img src={pizza.imageUrl} />
				<div className='full-pizza-content'>
					<div>
						<h2>{pizza.title}</h2>
						<h4>{pizza.price} ₽</h4>
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

export default FullPizza;
