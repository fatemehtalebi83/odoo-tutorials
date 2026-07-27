import { Component } from "@odoo/owl";
import { registry } from"@web/core/registry";
import {useClicker} from "../clicker_hook";
import { ClickValue } from "../click_value/click_value";
import { Notebook } from "@web/core/notebook/notebook";

export class ClickerClientAction extends  Component{
	static template = "awesome_clicker.client_action";

	static components = {
		ClickValue,
		Notebook,
	};

	setup() {
		this.clicker = useClicker();

		this.pages = [
    {
        id: "clicks",
        title: "Clicks",
    },
    {
        id: "trees",
        title: "Trees and Fruits",
    },
];
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

	buyPower() {
		this.clicker.buyPower();
	}

	buyPearTree() {
		this.clicker.buyPearTree();
	}

	buyCherryTree() {
		this.clicker.buyCherryTree();
	}

	buyPeachTree() {
		this.clicker.buyPeachTree();
	}
}

registry.category("actions").add(
	"awesome_clicker.client_action",
	ClickerClientAction
);