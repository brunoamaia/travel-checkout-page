import { MouseEvent } from 'react';

interface AdultInfoProps {
	email: string;
	cpf: string;
	name: string;
	phone: string;
}

interface PlacesInfoProps {
	destiny: string;
	origin: string;
	startDate: string;
	endDate: string;
}

interface TravelFormData {
	adultInfo: AdultInfoProps[];
	placesInfo: PlacesInfoProps;
}

interface ErrorStructureProps {
	field: string;
	info: string;
}

interface validateAdultDataProps {
	(
		adultData: AdultInfoProps[]
	): ErrorStructureProps[];
}

const validateAdultData: validateAdultDataProps = (adultData) => {
	const propertiesToValidate: Record<string, number> = {
		name: 6,
		cpf: 9,
		email: 12,
		phone: 12,
	};
	// const adultErrors = new Set<number>();
	const adultErrors: ErrorStructureProps[] = [];
	
	for (let index = 0; index < adultData.length; index++) {
		const adult = adultData[index];
	
		for (const property in propertiesToValidate) {
			if (property in propertiesToValidate && 
				adult[property as keyof AdultInfoProps].length <= propertiesToValidate[property]
			) {
				adultErrors.push({field: `${index}`, info: property});
				break;
			}
		}
	}
	
	return Array.from(adultErrors);
};

interface setTimestampDateProps {
	(
		stringData: string
	): number
}

const setTimestampDate: setTimestampDateProps = (stringData) => {
	const dateWitchHour = `${stringData} 14:00`;
	const newDate = new Date(dateWitchHour);

	console.log(newDate);
	return newDate.getTime();
};

interface validatePlacesDataProps {
	(
		placesData: {
			destiny: string;
			origin: string;
			startDate: number | null;
			endDate: number | null;
		}
	): ErrorStructureProps[]
}

const validatePlacesData: validatePlacesDataProps = (placesData) => {
	const { destiny, origin, endDate, startDate} = placesData;
	const errors: ErrorStructureProps[] = [];
	const today = new Date();
	today.setHours(23, 59, 0, 0);
	const todayTimestamp = today.getTime();
	const startDateValid = startDate ? startDate : todayTimestamp;

	const validationRules = [
		{
			condition: !destiny.length,
			field: 'Destino',
			info: 'Selecione uma cidade de destino',
		},
		{
			condition: !origin,
			field: 'Origem',
			info: 'Selecione uma cidade de origem',
		},
		{
			condition: origin && destiny && origin === destiny,
			field: 'Destino',
			info: 'Destino deve ser diferente da origem',
		},
		{
			condition: !startDate,
			field: 'Saída',
			info: 'Selecione uma data de saída.',
		},
		{
			condition: startDate && startDateValid <= todayTimestamp,
			field: 'Saída',
			info: 'Selecione uma data a partir de amanhã.',
		},
		{
			condition: !endDate,
			field: 'Volta',
			info: 'Selecione uma data de volta.',
		},
		{
			condition: endDate && endDate <= todayTimestamp,
			field: 'Volta',
			info: 'Selecione uma data a partir de amanhã.',
		},
		{
			condition: endDate && endDate <= startDateValid,
			field: 'Volta',
			info: 'A volta deve ser depois do dia da saída.',
		},
	];

	validationRules.forEach(({condition, field, info}) => {
		if (condition) {
			errors.push({field: field, info: info});
		}
	});

	return errors;
};

interface validateFormDataProps {
	(
		event: MouseEvent<HTMLButtonElement>,
		travelData: TravelFormData,
		setHasError: React.Dispatch<React.SetStateAction<ErrorStructureProps[]>>,
		setIsValidForm: React.Dispatch<React.SetStateAction<boolean>>
	): void;
}

export const validateFormData:validateFormDataProps = (event, travelData, setHasError, setIsValidForm) => {
	const { adultInfo, placesInfo } = travelData;
	const { endDate, startDate } = placesInfo;
	const initialDate = startDate ? setTimestampDate(startDate) : null;
	const finalDate = endDate ? setTimestampDate(endDate) : null;
	const errors:ErrorStructureProps[] = [];
	const newPlacesInfo = {
		...placesInfo,
		startDate: initialDate,
		endDate: finalDate
	};
	const adultErrors = validateAdultData(adultInfo);
	const placesErrors = validatePlacesData(newPlacesInfo);

	// Depois remover "preventDefault" para fazer a validação dos campos e não redirecionar
	event.preventDefault();
	
	if (adultErrors.length) {
		for (let index = 0; index < adultErrors.length; index++) {
			errors.push({ field: adultErrors[index].field, info: adultErrors[index].info });
		}
	}
	if (placesErrors.length) {
		for (let index = 0; index < placesErrors.length; index++) {
			errors.push({ field: placesErrors[index].field, info: placesErrors[index].info});
		}
	}

	console.log(errors);
	if(!errors.length) {
		setIsValidForm(true);
	}
	setHasError(errors);
};
