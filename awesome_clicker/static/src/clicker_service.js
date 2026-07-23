import { reactive } from "@odoo/owl";
import { registry } from"@web/core/registry";
import { ClickerModel } from "./clicker_model";

export const clickerService ={
	start(env){
		const clicker = new ClickerModel();


		clicker.bus.addEventListener(
            "MILESTONE_1k",
            () => {

                env.services.effect.add({
                   type: "rainbow_man",
	               message: "Milestone reached! You can now buy ClickBots.",
               });
            }
        );

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