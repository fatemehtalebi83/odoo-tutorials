import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import {standardViewProps} from "@web/views/standard_view_props";
import { usePager } from "@web/search/pager_hook";

export class GalleryController extends Component {
	static template = "awesome_gallery.GalleryController";

	static components = {
		Layout,
	};

	static props = {
		...standardViewProps,
		Model: Function,
		Renderer: Function,
		archInfo: Object,
	};

	setup() {
		this.orm = useService("orm");

		this.state = useState({
			offset: 0,
			limit: 80,
		});
		this.model = useState(
		  new this.props.Model(
			this.orm,
			this.props.resModel,
			this.props.archInfo.imageField,
			this.props.archInfo.tooltipField,
			this.props.archInfo.fields,
		  )
		);

		onWillStart(async () => {
			await this.model.load(
				this.props.domain,
				this.state.offset,
				this.state.limit,
				);
		});

		onWillUpdateProps(async (nextProps) => {
			await this.model.load(
				nextProps.domain,
				this.state.offset,
				this.state.limit,
				);
		});

		usePager(() => ({
			offset: this.state.offset,
			limit: this.state.limit,
			total: this.model.state.count,

			onUpdate: async ({ offset, limit }) => {
				this.state.offset = offset;
				this.state.limit = limit;

				await this.model.load(
					this.props.domain,
					offset,
					limit,
				);
			},
		}));
	}
}