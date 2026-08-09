import { KanbanController } from "@web/views/kanban/kanban_controller";
import { CustomerList } from "./customer_list";


export class AwesomeKanbanController extends KanbanController{
	static template = "awesome_kanban.AwesomeKanbanController";

	static  components = {
		...KanbanController.components,
		CustomerList,
	};
}