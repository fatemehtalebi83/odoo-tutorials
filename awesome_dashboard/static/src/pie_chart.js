import { Component, onMounted, onWillStart, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
	static template = "awesome_dashboard.PieChart";

	static props = {
		data: Object,
	};

	setup() {
		this.canvasRef = useRef("canvas");

		onWillStart(async() => {
			await loadJS("/web/static/lib/Chart/Chart.js");
		});

		onMounted(() => {
			this.renderChart();
		});
	}

	renderChart() {
		const data = this.props.data;

		new Chart(this.canvasRef.el, {
			type: "pie",
			data: {
				labels: Object.keys(data),
				datasets: [
					{
						data: Object.values(data),
					},
				],
			},
		});
	}
}