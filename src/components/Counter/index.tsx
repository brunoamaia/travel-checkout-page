import { useState } from 'react';
import { ButtonDefault } from './styles';

function Counter() {
	const [count, setCount] = useState<number>(0);

	return (
		<ButtonDefault onClick={() => setCount((count) => count + 1)}>
			O contador é: {count}
		</ButtonDefault>
	);
}

Counter.displayName = 'component/Counter';

export default Counter;
