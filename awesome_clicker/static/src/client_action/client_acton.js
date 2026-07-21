import { Component } from "@odoo/owl";
import { registry } from"@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useState } from "@odoo/owl";

export class ClickerClientAction extends  Component{
	static template = "awesome_clicker.client_action";

	setup() {
		this.clicker = useService("clicker");
		this.state = useState(this.clicker.state);
	}

	increment() {
		this.clicker.increment(10);
	}
}

registry.category("actions").add(
	"awesome_clicker.client_action",
	ClickerClientAction
);