
export class GalleryArchParser {
	parse(xmlDoc) {
		const imageField = xmlDoc.getAttribute("image_field");
		const tooltipField = xmlDoc.getAttribute("tooltip_field");

		return {
			imageField,
			tooltipField,
		};
	}
}