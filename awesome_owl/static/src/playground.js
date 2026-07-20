import { Component, markup, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";

export class Playground extends Component {
    static template = "awesome_owl.playground";

   static components = {
	   Counter,
	   Card,
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
