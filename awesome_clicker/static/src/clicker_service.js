import { reactive } from "@odoo/owl";
import { registry } from"@web/core/registry";
import { ClickerModel } from "./clicker_model";
import { browser } from "@web/core/browser/browser";

const STORAGE_KEY = "awesome_clicker_state";
const STATE_VERSION = 2;

const migrations = [
	{
		fromVersion: 1,
		toVersion: 2,
		apply(state) {
			state.peachTrees = 0;
			state.peaches = 0;
		},
	},
];

export const clickerService ={
	start(env){
		const savedState = browser.localStorage.getItem(STORAGE_KEY);

		let clicker = new ClickerModel();

		if (savedState) {
            const state = JSON.parse(savedState);

			state.version ??= 1;

			while (state.version < STATE_VERSION) {
				const migration = migrations.find(
					(m) => m.fromVersion === state.version
				);

				if(!migration) {
					break;
				}

				migration.apply(state);
				state.version = migration.toVersion;
			}
            Object.assign(clicker, state);
        }

        clicker = reactive(clicker);

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
				clicker.increment((clicker.clickBots*10 + clicker.bigBots*100)*clicker.power);
			}
		},
			10000);

		setInterval(() => {
            browser.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
	                version: STATE_VERSION,
                    clicks: clicker.clicks,
                    level: clicker.level,
                    clickBots: clicker.clickBots,
                    bigBots: clicker.bigBots,
                    power: clicker.power,
                    pearTrees: clicker.pearTrees,
                    cherryTrees: clicker.cherryTrees,
	                peachTrees: clicker.peachTrees,
                    pears: clicker.pears,
                    cherries: clicker.cherries,
	                peaches: clicker.peaches,
                })
            );
		}, 10000);

		setInterval(() => {
            clicker.pears += clicker.pearTrees;
            clicker.cherries += clicker.cherryTrees;
			clicker.peaches += clicker.peachTrees;
        },
		    30000);

		return clicker;
	},
};

registry.category("services").add(
    "clicker",
	clickerService,
);