import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "./clicker_hook";


patch(FormController.prototype, {

    setup() {

        super.setup();

        this.notification = useService("notification");
        this.action = useService("action");
        this.clicker = useClicker();

        if (true) {

            this.showReward();
        }
    },


    showReward() {
        const reward = this.clicker.getReward();

		let closeNotification;

        closeNotification = this.notification.add(
            reward.description,
            {
                title: "Reward!",
                type: "success",

                buttons: [
                    {
                        name: "Collect",

                        onClick: () => {

                            reward.apply(this.clicker);

							if(closeNotification) {
								closeNotification();
							}

                            this.action.doAction({
                                type: "ir.actions.client",
                                tag: "awesome_clicker.client_action",
                                target: "new",
                                name: "Clicker",
                            });

                        },
                    },
                ],
            }
        );
    },

});