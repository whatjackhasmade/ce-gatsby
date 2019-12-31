import styled from "styled-components";

export const Styled404 = styled.section`
	display: flex;
	margin-left: calc(-50vw + 50%);
	margin-right: calc(-50vw + 50%);
	min-height: 500px;
	padding: 32px 0;

	background-color: ${props => props.theme.grey100};

	h1 {
		margin-top: 0;
	}

	.fourofour__grid {
		margin: 0 auto;
		max-width: ${props => props.theme.gridMax};
		padding: 0 30px;
		width: 100%;
	}

	.fourofour__wrapper {
		max-width: 560px;
		padding: 32px;
		width: 100%;

		background-color: ${props => props.theme.white};
	}
`;

export default Styled404;
