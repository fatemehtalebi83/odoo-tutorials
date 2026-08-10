import { Component, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboard_item";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

	static components = {
		Layout,
		DashboardItem,
	};

	setup() {
		this.action = useService("action");
		this.statisticsService = useService("awesome_dashboard.statistics");

		onWillStart(async ()=> {
			this.statistics = await this.statisticsService.loadStatistics();

			console.log("Statistics:", this.statistics);
		});
	}

	openCustomers() {
		this.action.doAction("contacts.action_contacts");
	}

	openLeads() {
		this.action.doAction({
			type: "ir.actions.act_window",
			name: "Leads",
			res_model: "crm.lead",
			views: [
				[false, "list"],
				[false, "form"],
			],
		});
	}
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
