import { Component, xml} from "@odoo/owl";
import { url } from "@web/core/utils/urls";
import { useService } from "@web/core/utils/hooks";
import { useTooltip } from "@web/core/tooltip/tooltip_hook";
import { FileUploader } from "@web/views/fields/file_handler";


class GalleryItem extends Component {
    static template = "awesome_gallery.GalleryItem";

	static components = {
		FileUploader,
	};

    static props = {
        record: Object,
        imageField: String,
        tooltipTemplate: { type: Object, optional: true },
	    resModel: String,
	    openRecord: Function,
	    onUploaded: Function,
    };

    setup() {
        this.tooltipRef = "tooltip";

        if (this.tooltipTemplate) {
            const template = this.tooltipTemplate.cloneNode(true);

            for (const field of template.querySelectorAll("field")) {
                const fieldName = field.getAttribute("name");

                const tElement = document.createElement("t");
                tElement.setAttribute("t-esc", `info.${fieldName}`);

                field.replaceWith(tElement);
            }

            this.tooltipTemplate = xml(template.innerHTML);
        }

        useTooltip("tooltip", {
            template: this.tooltipTemplate,
            info: this.props.record,
        });

	    const tooltipParams = {
            template: this.tooltipTemplate,
            info: this.props.record,
        };

        console.log("TOOLTIP PARAMS:", tooltipParams);

        useTooltip("tooltip", tooltipParams);
    }

    getImageUrl() {
        const record = this.props.record;

        if (!record[this.props.imageField]) {
            return null;
        }

        return url("/web/image", {
            model: this.props.resModel,
            id: record.id,
            field: this.props.imageField,
            unique: record.write_date,
        });
    }
}

export class GalleryRenderer extends Component {
	static template = "awesome_gallery.GalleryRenderer";

	static components = {
		FileUploader,
		GalleryItem,
	};

	static props ={
		model: Object,
		imageField: String,
		switchView: Function,
		tooltipField: {type:String, optional:true},
		tooltipTemplate: {type:Object, optional:true},
	};

	setup() {
		this.action = useService("action");
		this.orm = useService("orm");
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