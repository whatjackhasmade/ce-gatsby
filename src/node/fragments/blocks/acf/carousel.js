const mediaFields = require(`../../media`);
const seoFields = require(`../../seo`);

const carouselBlock = `
... on WORDPRESS_AcfCarouselBlock {
	carouselFields: acf {
		intro {
			cta {
				target
				title
				url
			}
			subtitle
			text
			title
		}
		items {
			title
		}
	}
}
`;

module.exports = carouselBlock;
