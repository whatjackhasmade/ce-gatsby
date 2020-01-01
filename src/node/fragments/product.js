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
		sliceOne {
			${sliceFields}
		}
		sliceTwo {
			${sliceFields}
		}
		sliceThree {
			${sliceFields}
		}
		sliceFour {
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
