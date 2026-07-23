import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {

	constructor() {
		super();

		this.bus = new EventBus();
	}

    clicks = 0;
    level = 0;
    clickBots = 0;

    increment(inc) {
        this.clicks += inc;
        this.updateLevel();
    }

    updateLevel() {
        if (this.clicks >= 1000 && this.level < 1) {
            this.level = 1;

			this.bus.trigger("MILESTONE_1k");
        }
    }

    buyClickBot() {
        if (this.clicks >= 1000) {
            this.clicks -= 1000;
            this.clickBots += 1;
        }
    }
}