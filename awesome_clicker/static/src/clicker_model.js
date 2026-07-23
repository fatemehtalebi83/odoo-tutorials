import { Reactive } from "@web/core/utils/reactive";

export class ClickerModel extends Reactive {

    clicks = 0;
    level = 0;
    clickBots = 0;

    increment(inc) {
        this.clicks += inc;
        this.updateLevel();
    }

    updateLevel() {
        if (this.clicks >= 1000) {
            this.level = 1;
        }
    }

    buyClickBot() {
        if (this.clicks >= 1000) {
            this.clicks -= 1000;
            this.clickBots += 1;
        }
    }
}