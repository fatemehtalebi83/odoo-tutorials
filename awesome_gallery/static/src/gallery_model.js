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
			count:0,
		})
	}

	async load(domain, offset=0, limit=80) {
		this.domain= domain;

		const specification = {
			[this.imageField]: {},
			write_date: {},
		};

		if(this.tooltipField) {
			specification[this.tooltipField] = {};
		}
		const { records, length } = await this.keepLast.add(
			this.orm.webSearchRead(
				this.resModel,
				domain,
				{
					specification,
					offset,
					limit,
					context: {
						bin_size: true,
					},
				}
			)
		);

		this.state.records = records;
		this.state.count = length;
	}
}