import React from "react";
import Styled404 from "./404.styles";

import Layout from "../storybook/src/components/particles/layout";

import Button from "../storybook/src/components/atoms/button/button";
import Link from "../storybook/src/components/atoms/link/link";

export default props => {
	return (
		<Layout {...props} cart={false} header={true} footer={true}>
			<Styled404>
				<div className="fourofour__grid">
					<div className="fourofour__wrapper">
						<h1>We're sorry, we couldn't find that page</h1>
						<p>Maybe it’s out there, somewhere...</p>
						<p>
							You can always find interesting <Link href="/shop">products</Link>{" "}
							and insightful <Link href="/posts">posts</Link> on our{" "}
							<Link href="/">homepage</Link>.
						</p>
						<Button href="/">Return to homepage</Button>
					</div>
				</div>
			</Styled404>
		</Layout>
	);
};
