import { reactive } from "@odoo/owl";
import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
	constructor(orm, resModel, imageField, tooltipField) {
		this.orm = orm;
		this.resModel = resModel;
		this.imageField = imageField;
		this.tooltipField = tooltipField;

		this.keepLast = new KeepLast();

		this.state = reactive({
			records: [],
		})
	}

	async load(domain) {
		const specification = {
			[this.imageField]: {},
		};

		if(this.tooltipField) {
			specification[this.tooltipField] = {};
		}
		const { records } = await this.keepLast.add(
			this.orm.webSearchRead(
				this.resModel,
				domain,
				{
					specification,
					context: {
						bin_size: true,
					},
				}
			)
		);

		this.state.records = records;
	}
}