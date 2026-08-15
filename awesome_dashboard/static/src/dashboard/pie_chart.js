import {Component, onMounted, onWillStart, onWillUnmount, useEffect, useRef} from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
	static template = "awesome_dashboard.PieChart";

	static props = {
		data: Object,
		onSliceClick: Function,
	};

	setup() {
		this.canvasRef = useRef("canvas");

		onWillStart(async() => {
			await loadJS("/web/static/lib/Chart/Chart.js");
		});

		useEffect(
			() => {
				if(this.props.data) {
					this.renderChart();
				}
			},
			() => [this.props.data]
		);

		onWillUnmount(() => {
			if(this.chart) {
				this.chart.destroy();
			}
		});
	}

	renderChart() {
		const data = this.props.data;

		if(!data || !this.canvasRef.el) {
			return;
		}

		if(this.chart) {
		    this.chart.destroy();
		}

		this.chart = new Chart(this.canvasRef.el, {
			type: "pie",
			data: {
				labels: Object.keys(data),
				datasets: [
					{
						data: Object.values(data),
					},
				],
			},

			options: {
				onClick: (event,elements) => {
					if(!elements.length) {
						return;
					}

					const index = elements[0].index;
					const size = Object.keys(data)[index];

					this.props.onSliceClick(size);
				},
			},
		});
	}
}