const fluidImageFields = require(`./gatsby/fluid`);

const mediaFields = `
	altText
	${fluidImageFields}
	mediaItemUrl
  uri
`;

module.exports = mediaFields;
