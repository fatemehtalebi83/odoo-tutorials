import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";

export class GalleryController extends Component {
	static template = "awesome_gallery.GalleryController";

	static components = {
		Layout,
	};

	setup() {
		this.orm = useService("orm");
		this.keepLast = new KeepLast();


		this.state = useState({
			records: [],
		});

		onWillStart(async () => {
			await this.loadImages(this.props.domain);
		});

		onWillUpdateProps(async (nextProps) => {
			await this.loadImages(nextProps.domain);
		});
	}

	async loadImages(domain, resModel = this.props.resModel, imageField = this.props.imageField) {
    this.keepLast.add(
        this.orm.webSearchRead(
            resModel,
            domain,
            {
                specification: {
                    [imageField]: {},
                },
                context: {
                    bin_size: true,
                },
            }
        )
    ).then(({ records }) => {
        this.state.records = records;
    });
}
}