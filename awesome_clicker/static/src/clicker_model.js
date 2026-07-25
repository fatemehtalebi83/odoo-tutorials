import { Reactive } from "@web/core/utils/reactive";
import { EventBus } from "@odoo/owl";
import { rewards } from "./click_rewards";
import { choose } from "./utils";

export class ClickerModel extends Reactive {

	constructor() {
		super();

		this.bus = new EventBus();
	}

    clicks = 0;
    level = 0;
    clickBots = 0;
	bigBots = 0;
	power= 1;

	pearTrees = 0;
	cherryTrees = 0;

	pears = 0;
	cherries = 0;

    increment(inc) {
        this.clicks += inc;
        this.updateLevel();
    }

    updateLevel() {
		if (this.clicks >= 1000000 && this.level < 4){
			this.level = 4;
		}
		else if (this.clicks >= 100000 && this.level < 3) {
            this.level = 3;
        }
        else if (this.clicks >= 5000 && this.level < 2) {
            this.level = 2;
        }

        else if (this.clicks >= 1000 && this.level < 1) {
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

	buyBigBot() {
		if(this.clicks >= 5000) {
			this.clicks -= 5000;

			this.bigBots += 1;
		}
	}

	buyPower() {
		if(this.clicks >= 50000) {
			this.clicks -= 50000;

			this.power += 1;
		}
	}

	getReward() {

         const availableRewards = rewards.filter((reward) => {

             return (
                (!reward.minLevel || this.level >= reward.minLevel)
                &&
                (!reward.maxLevel || this.level <= reward.maxLevel)
             );

         });

        return choose(availableRewards);
	}

	buyPearTree() {
		if(this.clicks >= 1000000) {
			this.clicks -= 1000000;

			this.pearTrees++;
		}
	}

	buyCherryTree() {
		if(this.clicks >= 1000000) {
			this.clicks -= 1000000;

			this.cherryTrees++;
		}
	}

	get totalTrees() {
		return this.pearTrees + this.cherryTrees;
	}

	get totalFruits() {
		return this.pears + this.cherries;
	}
}