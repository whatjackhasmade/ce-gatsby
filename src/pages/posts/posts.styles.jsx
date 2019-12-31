import styled from "styled-components";

export const StyledPosts = styled.section`
	padding: 32px 0;

	.insights__summary {
		margin-left: auto;
		padding-left: 48px;
		padding-right: 48px;

		border-left: 1px solid ${props => props.theme.grey200};
	}

	.insights__wrapper {
		display: flex;
	}
`;

export default StyledPosts;
