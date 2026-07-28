import { reactive } from "@odoo/owl";
import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryModel {
	constructor(orm, resModel, imageField) {
		this.orm = orm;
		this.resModel = resModel;
		this.imageField = imageField;

		this.keepLast = new KeepLast();

		this.state = reactive({
			records: [],
		})
	}

	async load(domain) {
		const { records } = await this.keepLast.add(
			this.orm.webSearchRead(
				this.resModel,
				domain,
				{
					specification: {
						[this.imageField]: {},
					},
					context: {
						bin_size: true,
					},
				}
			)
		);

		this.state.records = records;
	}
}