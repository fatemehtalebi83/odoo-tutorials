import {Component, useExternalListener} from "@odoo/owl";
import { registry } from"@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "../clicker_hook";

export class ClickerSystrayItem extends Component {
	static template = "awesome_clicker.ClickerSystrayItem";

	setup() {

		this.clicker = useClicker();


		useExternalListener(
			document.body,
			"click",
			this.onBodyClick,
			{capture:true}
		);

		this.action = useService("action");
	}

	increment(){
		this.clicker.increment(10);
	}

	onBodyClick(ev){
		if (ev.target.closest(".o_clicker_button") ||
		    ev.target.closest(".o_clicker_increment")){
			return;
		}
		this.clicker.increment(1);
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
