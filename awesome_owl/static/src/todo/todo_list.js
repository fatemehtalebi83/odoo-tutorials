import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { TodoItem } from "./todo_item";

export class TodoList extends Component {

    static template = "awesome_owl.TodoList";

    static components = {
        TodoItem,
    };

	static props ={};

    setup() {
        this.todos = useState([]);
		this.nextId = 1;

		this.inputREf = useRef("todoInput");

		onMounted(() => {
			this.inputREf.el.focus();
		});
    }

	addTodo(ev) {
    if (ev.keyCode === 13) {
        const description = ev.target.value.trim();

        if (!description) {
            return;
        }
        this.todos.push({
            id: this.nextId++,
            description,
            isCompleted: false,
        });
        ev.target.value = "";
    }
}

    toggleState(id) {
        const todo = this.todos.find(t => t.id === id);

        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }

	removeTodo(id){
		const index = this.todos.findIndex(todo => todo.id === id);

		if (index >= 0) {
			this.todos.splice(index, 1);

			this.todos.forEach((todo, index) => {
            todo.id = index + 1;
        });

        this.nextId = this.todos.length + 1;
		}
	}
}