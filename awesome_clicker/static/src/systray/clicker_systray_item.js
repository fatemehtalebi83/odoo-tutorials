import {Component, useState} from "@odoo/owl";
import { registry } from"@web/core/registry";

export class ClickerSystrayItem extends Component {
	static template = "awesome_clicker.ClickerSystrayItem";

	setup() {
		this.state = useState({
			clicks:0,
		});
	}

	increment(){
		this.state.clicks++;
	}
}

registry.category("systray").add(
    "awesome_clicker.systray",
    {
        Component: ClickerSystrayItem,
    }
);
