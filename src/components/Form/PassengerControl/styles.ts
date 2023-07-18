import styled from 'styled-components';

export const PassengerControlContainer = styled.div`
	.quantity-control {
		display: flex;
		align-items: center;
		height: 30px;
		gap: 5px;

		p {
			padding-left: 10px;
			width: 90px;
		}

		button {
			border: none;
			min-width: auto;
			width: 35px;
			height: 20px;
			padding: 0 5px;

			&.btn-minus {
				background-color: #923;
			}
		}

		button:disabled {
			border: none;
			background-color: #666;
		}
	
		img {
			height: 14px;
			width: 14px;
		}
	}
`;
