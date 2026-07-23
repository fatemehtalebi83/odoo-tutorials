import { reactive } from "@odoo/owl";
import { registry } from"@web/core/registry";


export const clickerService ={
	start(){
		const state = reactive({
			clicks: 0,
			level: 0,
			clickBots: 0,
        });

		function updateLevel() {
			if(state.clicks >= 1000) {
				state.level = 1;
			}
		}

		function increment(inc) {
			state.clicks += inc;
			updateLevel();
		}

		function buyClickBot() {
			if(state.clicks >= 1000) {
				state.clicks -= 1000;
				state.clickBots += 1;
			}
		}

		setInterval(() => {
			if(state.clickBots > 0){
				increment(state.clickBots*10);
			}
		},
			10000);

		return {
            state,
            increment,
			buyClickBot,
      };
	},
};

registry.category("services").add(
    "clicker",
	clickerService,
);