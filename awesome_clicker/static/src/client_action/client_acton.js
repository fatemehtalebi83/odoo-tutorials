import { Component } from "@odoo/owl";
import { registry } from"@web/core/registry";
import {useClicker} from "../clicker_hook";
import { ClickValue } from "../click_value/click_value";

export class ClickerClientAction extends  Component{
	static template = "awesome_clicker.client_action";

	static components = {
		ClickValue,
	};

	setup() {
		this.clicker = useClicker();
	}

	increment() {
		this.clicker.increment(10);
	}

	buyClickBot() {
		this.clicker.buyClickBot();
	}

	buyBigBot() {
		this.clicker.buyBigBot();
	}
}

registry.category("actions").add(
	"awesome_clicker.client_action",
	ClickerClientAction
);