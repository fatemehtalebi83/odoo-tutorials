import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { DashboardItem } from "./dashboard_item";
import { PieChart } from "./pie_chart";
import { DashboardSettings } from "./dashboard_setting";
import { _t } from "@web/core/l10n/translation";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

	static components = {
		Layout,
		DashboardItem,
		PieChart,
		DashboardSettings,
	};

	setup() {
		this.action = useService("action");
		this.dialog = useService("dialog");

		this.statisticsService = useService("awesome_dashboard.statistics");

		this.statistics = useState(
			this.statisticsService.statistics
		);

		this.allItems = registry.category("awesome_dashboard").getAll();

		this.items = useState(
			this.getVisibleItems()
		);
	}

	openCustomers() {
		this.action.doAction("contacts.action_contacts");
	}

	openLeads() {
		this.action.doAction({
			type: "ir.actions.act_window",
			name: _t("Leads"),
			res_model: "crm.lead",
			views: [
				[false, "list"],
				[false, "form"],
			],
		});
	}

	getRemovedItems() {
		return JSON.parse(
			localStorage.getItem("awesome_dashboard.removed_items") || "[]"
		);
	}

    getVisibleItems() {
		const removedItems = this.getRemovedItems();

		return this.allItems.filter(
			(item) => !removedItems.includes(item.id)
		);
    }

	openSettings() {
		this.dialog.add(DashboardSettings, {
			items: this.allItems,

			apply: (removedItems) =>{
				localStorage.setItem(
					"awesome_dashboard.removed_items",
					JSON.stringify(removedItems)
				);

				this.items.splice(
				0,
					this.items.length,
					...this.getVisibleItems()
				);
			},
		});
	}

	openOrderBySize(size) {
		this.action.doAction({
			type: "ir.actions.act_window",
			name: `Orders${size.toUpperCase()}`,
			res_model: "sale.order",
			views: [
				[false, "list"],
				[false, "form"],
			],
			domain: [
				["order_line.product_id.name", "ilike", size],
			],
		});
	}
}

registry.category("lazy_components").add(
	"AwesomeDashboard", AwesomeDashboard);
