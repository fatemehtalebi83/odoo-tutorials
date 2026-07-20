import { Component, markup, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todo/todo_list";

export class Playground extends Component {
    static template = "awesome_owl.playground";

   static components = {
	   Counter,
	   Card,
	   TodoList,
   };

   setup() {
	   this.state = useState({
		   sum: 0,
	   });

	   this.html = markup("<b>Hello from owl!</b>");
   }

   incrementSum() {
		   this.state.sum++;
	   }
}
