import { useState } from 'react';
import { TripDataInputContainer } from './styles';

function TripDataInput() {
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [origin, setOrigin] = useState<string>('');
	const [destiny, setDestiny] = useState<string>('');

	// Usar select para poder selecionar as cidades
	// Validar datas para chegada ser sempre depois e saída não ser "no passado"
	return (
		<TripDataInputContainer>
			<h3>Duração e roteiro da viagem</h3>
			<h4>Roteiro</h4>
			<div className="label-input">
				<label htmlFor="startDate">Origem:</label>
				<input
					id="startDate"
					type="text"
					value={origin}
					onChange={(e) => setOrigin(e.target.value)}
				/>
			</div>
			<div className="label-input">
				<label htmlFor="startDate">Destino:</label>
				<input
					id="startDate"
					type="text"
					value={destiny}
					onChange={(e) => setDestiny(e.target.value)}
				/>
			</div>

			<h4>Data</h4>
			<div className="label-input">
				<label htmlFor="startDate">Saída:</label>
				<input
					id="startDate"
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>
			<div className="label-input">
				<label htmlFor="endDate">Chegada:</label>
				<input
					id="endDate"
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</div>
		</TripDataInputContainer>
	);
}

TripDataInput.displayName = 'components/Form/TripDurationSelector';

export default TripDataInput;
