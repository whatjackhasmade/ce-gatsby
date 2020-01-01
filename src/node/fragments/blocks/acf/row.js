const mediaFields = require(`../../media`);
const seoFields = require(`../../seo`);

const rowBlock = `
... on WORDPRESS_AcfRowBlock {
	rowFields: acf {
		cta {
			target
			title
			url
		}
		description
		image {
			${mediaFields}
		}
		reverse
		subtitle
		title
	}
}
`;

module.exports = rowBlock;
