import React from "react";

import StyledPosts from "./posts.styles";

import useAllPosts from "../../gatsby/hooks/useAllPosts";

import Layout from "../../storybook/src/components/particles/layout";

import Link from "../../storybook/src/components/atoms/link/link";

import Archive from "../../storybook/src/components/organisms/archive/archive";

export default props => {
	return (
		<Layout {...props} cart={false}>
			<InsightsPage {...props} />
		</Layout>
	);
};

const InsightsPage = props => {
	const posts = useAllPosts();

	return (
		<StyledPosts>
			<div className="insights__wrapper">
				<div className="insights__content">
					<Link href="/">Return to homepage</Link>
					<h1 className="h3">Our Blog posts</h1>
				</div>
			</div>
			<Archive items={posts} />
		</StyledPosts>
	);
};
