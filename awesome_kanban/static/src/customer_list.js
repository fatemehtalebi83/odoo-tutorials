import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class CustomerList extends Component {
	static template = "awesome_kanban.CustomerList";

	static props = {
		selectCustomer: Function,
	};

	setup() {
		this.orm = useService("orm");

		this.state = useState({
			customers: [],
		});

		onWillStart(async() => {
			this.state.customers = await this.orm.searchRead(
				"res.partner",
				[],
				["name"]
			);
		});
	}
}