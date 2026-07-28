import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { GalleryModel } from "./gallery_model";
import { GalleryRenderer } from "./gallery_renderer";

export class GalleryController extends Component {
	static template = "awesome_gallery.GalleryController";

	static components = {
		Layout,
		GalleryRenderer,
	};

	setup() {
		this.orm = useService("orm");
		this.model = new GalleryModel(
			this.orm,
			this.props.resModel,
			this.props.imageField,
		);

		onWillStart(async () => this.model.load(this.props.domain));

		onWillUpdateProps(async (nextProps) => this.model.load(nextProps.domain));
	}
}