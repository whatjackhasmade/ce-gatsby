import { useStaticQuery, graphql } from "gatsby";

export const useGlobalFields = () => {
	const { wordpress } = useStaticQuery(
		graphql`
			query GET_GLOBAL_FIELDS {
				wordpress {
					themeGeneralSettings {
						globalFields: ACFOptionsGlobalFields {
							ctaBanner {
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
					}
				}
			}
		`
	);
	return wordpress.themeGeneralSettings.globalFields;
};

export default useGlobalFields;
