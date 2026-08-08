import {Component} from "@odoo/owl";
import { url } from "@web/core/utils/urls";
import { useService } from "@web/core/utils/hooks";
import { FileUploader } from "@web/views/fields/file_handler";

export class GalleryRenderer extends Component {
	static template = "awesome_gallery.GalleryRenderer";

	static props ={
		model: Object,
		imageField: String,
		switchView: Function,
		tooltipField: {type:String, optional:true},
	};

	static components = {
		FileUploader,
	};

	setup() {
		this.action = useService("action");
		this.orm = useService("orm");
	}

	getImageUrl(record) {
		if(!record[this.props.imageField]) {
			return null;
		}

		const imageUrl = url("/web/image", {
			model: this.props.model.resModel,
			id: record.id,
			field: this.props.imageField,
			unique: record.write_date,
		});

    return imageUrl;
	}

	openRecord = (record) => {
		this.action.switchView("form", {
			resId: record.id,
		});
	}

	onUploaded = async(record, file)=> {
		await this.orm.webSave(
			this.props.model.resModel,
			[record.id],
			{
				[this.props.imageField]: file.data,
			},
			{
				specification: {
					[this.props.imageField]: {},
					write_date: {},
				},
			}
		);

		await this.props.model.load(this.props.model.domain);
	};
}