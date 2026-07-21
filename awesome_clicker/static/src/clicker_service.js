import { reactive } from "@odoo/owl";
import { registry } from"@web/core/registry";
import {ClickerSystrayItem} from "./systray/clicker_systray_item";

const state = reactive({
	clicks: 0
});

export const clickerService ={
	start(){
		return {
            state,

        increment(inc) {
            state.clicks += inc
        },
      };
	},
};

registry.category("services").add(
    "clicker",
	clickerService,
);