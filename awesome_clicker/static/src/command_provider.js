import { registry } from "@web/core/registry";
import { useClicker } from "./clicker_hook";


registry.category("command_provider").add(
    "awesome_clicker.commands",
    {
        provide(env) {

            const clicker = env.services.clicker;


            return [
                {name: "Open Clicker Game",

                    action() {

                        env.services.action.doAction({
                            type: "ir.actions.client",
                            tag: "awesome_clicker.client_action",
                            target: "new",
                            name: "Clicker",
                        });
                    },
                },


                {name: "Buy 1 ClickBot",
                    action() {

                        clicker.buyClickBot();
                    },
                },
            ];
        },
    }
);