const mediaFields = require(`../../media`);
const seoFields = require(`../../seo`);

const sliderBlock = `
... on WORDPRESS_AcfSliderBlock {
	sliderFields: acf {
		items {
			cta {
				target
				title
				url
			}
			description
			image {
				${mediaFields}
			}
			light
			title
		}
	}
}
`;

module.exports = sliderBlock;
