import {Component, useState, useExternalListener} from "@odoo/owl";
import { registry } from"@web/core/registry";
import { useService } from "@web/core/utils/hooks";

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

		this.action = useService("action");
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

	openClicker() {
		this.action.doAction({
			type:"ir.actions.client",
			tag:"awesome_clicker.client_action",
			target:"new",
			name:"Clicker Game",
		});
	}
}

registry.category("systray").add(
    "awesome_clicker.systray",
    {
        Component: ClickerSystrayItem,
    }
);
