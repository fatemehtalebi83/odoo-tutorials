import {Component, useState, useExternalListener} from "@odoo/owl";
import { registry } from"@web/core/registry";

export class ClickerSystrayItem extends Component {
	static template = "awesome_clicker.ClickerSystrayItem";

	setup() {
		this.state = useState({
			clicks:0,
		});

		useExternalListener(
			document.body,
			"click",
			this.onBodyClick,
			{capture:true}
		);
	}

	increment(ev){
		ev.stopPropagation();
		this.state.clicks+= 10;
	}

	onBodyClick(ev){
		if (ev.target.closest(".o_clicker_button")){
			return;
		}
		this.state.clicks++;
	}
}

registry.category("systray").add(
    "awesome_clicker.systray",
    {
        Component: ClickerSystrayItem,
    }
);
