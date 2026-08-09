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
			displayActiveCustomers: false,
		});

		onWillStart(async() => {
			this.state.customers = await this.orm.searchRead(
				"res.partner",
				[],
				["name", "opportunity_ids"]
			);
		});
	}

	get displayedCustomer() {
		if(this.state.displayActiveCustomers) {
			return this.state.customers.filter(
				(customer) => customer.opportunity_ids.length > 0
			);
		}

		return this.state.customers;
	}

	onActiveCustomerChange = (ev) => {
		this.state.displayActiveCustomers = ev.target.checked;
	};
}