import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";

export class GalleryController extends Component {
	static template ="awesome_gallery.GalleryController";

	static components = {
		Layout,
	};

	setup() {
		this.orm = useService("orm");

		this.state = useState({
			records: [],
		});

		onWillStart(async () =>{
			await this.loadImages(this.props.domain);
		});

		onWillUpdateProps(async (nextProps) => {
			await this.loadImages(nextProps.domain);
		});
	}

	async loadImages(domain) {
		const { records } = await this.orm.webSearchRead(
			this.props.resModel,
			domain,
			{
				specification: {
					[this.props.imageField]: {},
				},
				context: {
					bin_size: true,
				},
			}
		);

		this.state.records = records;
	}
}