const mediaFields = require(`../../media`);
const seoFields = require(`../../seo`);

const panelsBlock = `
... on WORDPRESS_AcfPanelsBlock {
	panelsFields: acf {
		cta {
			target
			title
			url
		}
		items {
			content
			title
			link {
				target
				title
				url
			}
		}
	}
}
`;

module.exports = panelsBlock;
