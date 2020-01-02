const mediaFields = require(`./media`);
const seoFields = require(`./seo`);

const sliceFields = `
	images {
		image {
			${mediaFields}
		}
	}
	reverse
	text
`;

const productFields = `
	id
	productId
	productFields: ACFProductFields {
		enabledComponents
		cta: banner {
			content
			cta {
				target
				title
				url
			}
			title
			useGlobalCta
		}
		slice_one: sliceOne {
			${sliceFields}
		}
		slice_two: sliceTwo {
			${sliceFields}
		}
		slice_three: sliceThree {
			${sliceFields}
		}
		slice_four: sliceFour {
			${sliceFields}
		}
	}
	averageRating
	catalogVisibility
	date
	dateOnSaleFrom
	dateOnSaleTo
	description(format: RENDERED)
	featured
	image {
		${mediaFields}
	}
	link
	menuOrder
	modified
	name
	onSale
	productCategories {
		nodes {
			count
			description
			id
			image {
				${mediaFields}
			}
			title: name
			productCategoryId
			${seoFields}
			slug
		}
	}
	purchasable
	purchaseNote
	reviewCount
	reviewsAllowed
	shortDescription(format: RENDERED)
	sku
	slug
	status
	title: name
	totalSales
	type
	... on WORDPRESS_SimpleProduct {
		price
	}
`;

module.exports = productFields;
