import { useStaticQuery, graphql } from "gatsby";

export const useAllPosts = () => {
	const { wordpress } = useStaticQuery(
		graphql`
			query AllWordPressPosts {
				wordpress {
					posts {
						nodes {
							categories {
								nodes {
									description
									id
									name
									slug
								}
							}
							content
							date
							dateGmt
							featuredImage {
								altText
								mediaItemUrl
							}
							id
							slug
							status
							title
							uri
						}
					}
				}
			}
		`
	);
	return wordpress.posts.nodes;
};

export default useAllPosts;
