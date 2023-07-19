import styled from 'styled-components';

export const CheckoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	margin: 0 auto;
	min-height: calc(100vh - 150px);

	@media screen and (max-width: 1000px) {
		max-width: 900px;
	}

	@media screen and (min-width: 1001px) {
		max-width: 1000px;
	}

	h2 {
		font-size: 1.5em;
	}

	.card {
		margin: 0 auto;
		padding: 10px;
		margin: 30px auto;
		border: 2px solid #333;
		border-radius: 10px;
		background-color: #DDD;

		.map {
			padding-left: 10px;
		}
			
		.data-key {
			display: flex;
			margin: 5px 10px;

			.info {
				padding-left: 10px;
			}
		}
	}

	a {
		color: #fff;
		text-decoration: none;
		font-weight: bold
	}

	button {
		height: 40px;
		margin-bottom: 20px;
	}
`;
