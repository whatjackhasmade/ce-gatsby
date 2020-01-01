const mediaFields = require(`../../media`);
const seoFields = require(`../../seo`);

const bannerBlock = `
... on WORDPRESS_AcfBannerBlock {
	bannerFields: acf {
		content
		cta {
			target
			title
			url
		}
		title
		variant
	}
}
`;

module.exports = bannerBlock;
