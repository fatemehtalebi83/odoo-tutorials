import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { Pager } from "@web/core/pager/pager";
import { fuzzyLookup } from "@web/core/utils/search";

export class CustomerList extends Component {
	static template = "awesome_kanban.CustomerList";

	static components = {
		Pager,
	};

	static props = {
		selectCustomer: Function,
	};

	setup() {
		this.orm = useService("orm");

		this.state = useState({
			customers: [],
			displayActiveCustomers: false,
			searchString: "",
			offset: 0,
			limit: 20,
			total: 0,
		});

		onWillStart(async() => {
			await this.loadCustomers();
		});
	}

	onPagerUpdate = async ({offset, limit}) => {
		this.state.offset = offset;
		this.state.limit = limit;

		await this.loadCustomers();
	};

	async loadCustomers() {
    const { records, length } = await this.orm.webSearchRead(
        "res.partner",
        [],
        {
            specification: {
                name: {},
                opportunity_ids: {},
            },
            offset: this.state.offset,
            limit: this.state.limit,
        }
    );

    this.state.customers = records;
    this.state.total = length;
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