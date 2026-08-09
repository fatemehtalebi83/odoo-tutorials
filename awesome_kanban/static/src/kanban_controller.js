import { KanbanController } from "@web/views/kanban/kanban_controller";
import { CustomerList } from "./customer_list";

const isFromAwesomeKanban =
	"isFromAwesomeKanban";

export class AwesomeKanbanController extends KanbanController{
	static template = "awesome_kanban.AwesomeKanbanController";

	static  components = {
		...KanbanController.components,
		CustomerList,
	};

	selectCustomer = (customer) => {
        const partner_id = customer.id;
        const partner_name = customer.name;

        const customerFilters = this.env.searchModel.getSearchItems(
            (searchItem) => searchItem.isFromAwesomeKanban
        );

        for (const customerFilter of customerFilters) {
            if (customerFilter.isActive) {
                this.env.searchModel.toggleSearchItem(customerFilter.id);
            }
        }

        this.env.searchModel.createNewFilters([
            {
                description: partner_name,
                domain: [["partner_id", "=", partner_id]],
                [isFromAwesomeKanban]: true,
            },
        ]);
    };
}