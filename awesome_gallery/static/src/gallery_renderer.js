import {Component} from "@odoo/owl";
import { url } from "@web/core/utils/urls";
import { useService } from "@web/core/utils/hooks";

export class GalleryRenderer extends Component {
	static template = "awesome_gallery.GalleryRenderer";

	static props ={
		model: Object,
		imageField: String,
		switchView: Function,
		tooltipField: {type:String, optional:true},
	};

	setup() {
		this.action = useService("action");
	}

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

	openRecord = (record) => {
		this.action.switchView("form", {
			resId: record.id,
		});
	}
}