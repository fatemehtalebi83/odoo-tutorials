import { reactive } from "@odoo/owl";
import { registry } from"@web/core/registry";
import { ClickerModel } from "./clicker_model";

export const clickerService ={
	start(){
		const clicker = new ClickerModel();

		setInterval(() => {
			if(clicker.clickBots > 0){
				clicker.increment(clicker.clickBots*10);
			}
		},
			10000);

		return clicker;
	},
};

registry.category("services").add(
    "clicker",
	clickerService,
);