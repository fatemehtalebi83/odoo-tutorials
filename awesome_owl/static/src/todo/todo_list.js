import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todo_item";

export class TodoList extends Component {

    static template = "awesome_owl.TodoList";

    static components = {
        TodoItem,
    };

    setup() {
        this.todos = useState([
			{
                id: 1,
                description: "Exam",
                isCompleted: true,
            },
	        {
                id: 2,
                description: "Write Report for Internship Lesson",
                isCompleted: false,
            },
            {
                id: 3,
                description: "complete odoo task",
                isCompleted: false,
            },
        ]);
    }
}