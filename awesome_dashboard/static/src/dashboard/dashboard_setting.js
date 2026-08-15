import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class DashboardSettings extends Component {
    static template = "awesome_dashboard.DashboardSettings";

    static components = {
        Dialog,
    };

    static props = {
        items: Array,
        close: Function,
        apply: Function,
    };

    setup() {
        this.state = useState({
            selectedItems: this.props.items.map(() => true),
        });
    }

    applyChanges() {
        const removedItems = this.props.items
            .filter((item, index) => !this.state.selectedItems[index])
            .map((item) => item.id);

        this.props.apply(removedItems);
        this.props.close();
    }
}