import {Component} from "@odoo/owl";

export class GalleryRenderer extends Component {
	static template = "awesome_gallery.GalleryRenderer";

	static props ={
		model: Object,
		imageField: String,
	};
}