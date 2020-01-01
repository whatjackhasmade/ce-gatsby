const mediaFields = require(`./media`);

const seoFields = `
	seo {
		title
		focuskw
		metaDesc
		metaKeywords
		opengraphDescription
		opengraphImage {
			${mediaFields}
		}
		opengraphTitle
		twitterDescription
		twitterImage {
			${mediaFields}
		}
		twitterTitle
	}
`;

module.exports = seoFields;
