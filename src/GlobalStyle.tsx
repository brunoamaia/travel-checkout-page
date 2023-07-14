import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		font-weight: 400;
	}

	body {
		background-color: #bbb;
		color: #29292E;
	}

	h1, h2, h3, h4, h5 {
		font-weight: 700;
	}

	h1 {
		font-size: 3.2em;
		line-height: 1.1;
	}

	button {
		border-radius: 15px;
		padding: 0 15px;
		color: #FFF;
		border: 4px solid #252621;
		background-color: #252621;
		cursor: pointer;
		min-width: 100px;
	}

`;
