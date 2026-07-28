import { registry } from "@web/core/registry";
import { GalleryController } from "./gallery_controller";

export const galleryView = {
	type: "gallery",
	display_name: "Gallery",
	icon: "oi oi-view-grid",
	multiRecord: true,
	Controller: GalleryController,
};

registry.category("views").add("gallery",galleryView);