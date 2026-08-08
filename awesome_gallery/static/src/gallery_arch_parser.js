import { visitXML } from "@web/core/utils/xml";


export class GalleryArchParser {
	parse(xmlDoc) {
		const imageField = xmlDoc.getAttribute("image_field");
		const tooltipField = xmlDoc.getAttribute("tooltip_field");

		const fields = [];
        let tooltipTemplate = null;

        visitXML(xmlDoc, (node) => {
            if (node.tagName === "field") {
                const fieldName = node.getAttribute("name");

                if (fieldName && !fields.includes(fieldName)) {
                    fields.push(fieldName);
                }
            }

            if (node.tagName === "tooltip-template") {
                tooltipTemplate = node;
            }
        });

		return {
			imageField,
			tooltipField,
			fields,
            tooltipTemplate,
		};
	}
}