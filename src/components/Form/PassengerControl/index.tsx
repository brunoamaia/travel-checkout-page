import { Dispatch, MouseEvent, SetStateAction} from 'react';
import { PassengerControlContainer } from './styles';
import addPeopleIcon from '/user-plus.svg';
import removePeopleIcon from '/user-minus.svg';

interface PassengerControlProps {
	adults: number
	children: number
	setAdults: Dispatch<SetStateAction<number>>
	setChildren: Dispatch<SetStateAction<number>>
}

interface PeopleCounts {
	[key: string]: (count: number) => number;
}

function PassengerControl({adults, children, setAdults, setChildren}: PassengerControlProps) {
	const addOrRemovePeople = (event: MouseEvent<HTMLButtonElement>, type: string, operation: string) => {
		event.preventDefault();
		const operations: PeopleCounts = {
			add: (count) => count + 1,
			remove: (count) => count - 1,
		};
		
		if (type === 'adult') {
			setAdults((prevAdults) => operations[operation](prevAdults));
		} else {
			setChildren((prevChildren) => operations[operation](prevChildren));
		}
	};

	return (
		<PassengerControlContainer>
			<h3>Informações das pessoas</h3>
			<h4>Quantidade</h4>
			<div className='quantity-control'>
				<p>Adultos: {adults}</p>
				<button
					className='btn-minus'
					onClick={(event) => addOrRemovePeople(event, 'adult', 'remove')}
					disabled={adults <= 1 ? true : false}
				>
					<img src={removePeopleIcon} className="logo react" alt="React logo" />
				</button>
				<button
					onClick={(event) => addOrRemovePeople(event, 'adult', 'add')}
					disabled={adults >= 4 ? true : false}
				>
					<img src={addPeopleIcon} className="logo react" alt="React logo" />
				</button>
			</div>
			<div className='quantity-control'>
				<p>Crianças: {children}</p>
				<button
					className='btn-minus'
					onClick={(event) => addOrRemovePeople(event, 'children', 'remove')}
					disabled={children <= 0 ? true : false}
				>
					<img src={removePeopleIcon} className="logo react" alt="React logo" />
				</button>
				<button
					onClick={(event) => addOrRemovePeople(event, 'children', 'add')}
					disabled={children >= 4 ? true : false}
				>
					<img src={addPeopleIcon} className="logo react" alt="React logo" />
				</button>
			</div>
		</PassengerControlContainer>
	);
}

PassengerControl.displayName = 'components/Form/PassengerControl';

export default PassengerControl;
