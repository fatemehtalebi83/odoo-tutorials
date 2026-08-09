import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { fuzzyLookup } from "@web/core/utils/search";

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
			searchString: "",
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
		let customers = this.state.customers;

		if(this.state.displayActiveCustomers) {
			customers = customers.filter(
				(customer) => customer.opportunity_ids.length > 0
			);
		}

		if(this.state.searchString) {
			customers = fuzzyLookup(
				this.state.searchString,
				customers,
				(customer) => customer.name,
			);
		}

		return customers;
	}
}