import styled from "styled-components";

export const StyledCheckout = styled.section`
	padding: 32px 0;

	.checkout__content {
		min-height: 500px;
	}

	.checkout__summary {
		margin-left: auto;
		padding-left: 48px;
		padding-right: 48px;

		border-left: 1px solid ${props => props.theme.grey200};
	}

	.checkout__wrapper {
		display: flex;
	}
`;

export default StyledCheckout;
