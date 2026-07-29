import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import {standardViewProps} from "@web/views/standard_view_props";

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
		this.model = new this.props.Model(
			this.orm,
			this.props.resModel,
			this.props.archInfo.imageField,
			this.props.archInfo.tooltipField,
		);

		onWillStart(async () => this.model.load(this.props.domain));

		onWillUpdateProps(async (nextProps) => this.model.load(nextProps.domain));
	}
}