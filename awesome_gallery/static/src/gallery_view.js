import { registry } from "@web/core/registry";
import { GalleryController } from "./gallery_controller";
import { GalleryArchParser } from "./gallery_arch_parser";

export const galleryView = {
	type: "gallery",
	display_name: "Gallery",
	icon: "oi oi-view-grid",
	multiRecord: true,
	Controller: GalleryController,
	ArchParser: GalleryArchParser,

	props(genericProps, view) {
		const archInfo = new view.ArchParser().parse(
			genericProps.arch
		);

		return {
			...genericProps,
			...archInfo,
		};
	},
};

registry.category("views").add("gallery",galleryView);