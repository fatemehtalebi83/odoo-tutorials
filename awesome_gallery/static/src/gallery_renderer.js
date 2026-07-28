import {Component} from "@odoo/owl";
import { url } from "@web/core/utils/urls";

export class GalleryRenderer extends Component {
	static template = "awesome_gallery.GalleryRenderer";

	static props ={
		model: Object,
		imageField: String,
	};

	getImageUrl(record) {
		if(!record[this.props.imageField]) {
			return null;
		}

		return url("/web/image", {
			model: this.props.model.resModel,
			id: record.id,
			field: this.props.imageField,
		});
	}
}