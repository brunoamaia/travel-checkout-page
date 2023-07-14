import { useEffect, useState } from 'react';
import { FormContainer } from './styles';

interface FormProps {
	email: string;
	cpf: string;
	name: string;
	phone: string;
}

interface updatePeopleData {
	data: FormProps
	index: number
}

interface AdultFieldProps {
	index: number
	type: string
	updateData: ({data, index}: updatePeopleData) => void;
}

function AdultDataInput({ index, type, updateData }: AdultFieldProps) {
	const [name, setName] = useState('');
	const [cpf, setCpf] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const handleSave = () => {
		const formData: FormProps = {
			name: name,
			cpf: cpf,
			email: email,
			phone: phone,
		};

		updateData({data: formData, index: 0});
	};

	useEffect(() => {
		handleSave();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name, cpf, email, phone]);

	return (
		<FormContainer>
			<h4>Dados do(a) {type} {index + 1} </h4>

			<div className="label-input">
				<label htmlFor="name">Nome:</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>

			<div className="label-input">
				<label htmlFor="cpf">CPF:</label>
				<input
					id="cpf"
					type="text"
					value={cpf}
					onChange={(e) => setCpf(e.target.value)}
					placeholder="AAA.BBB.CCC-DD"
					pattern="([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})"
					required
				/>
			</div>

			<div className="label-input">
				<label htmlFor="phone">Telefone:</label>
				<input
					id="phone"
					type="text"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="(XX) AAAAA-BBBB"
					pattern="(\([0-9]{2}\))\s([0-9]{1})?([0-9]{4})-([0-9]{4})"
					required
				/>
			</div>

			<div className="label-input">
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
		</FormContainer>
	);
}

AdultDataInput.displayName = 'components/Form/AdultField';

export default AdultDataInput;
