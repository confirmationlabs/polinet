import React from 'react';
import { subscribe } from '../services/pubsubService.js'
import { parseJsonOrder, convertToJson, validateOrderAsync } from '../services/dharmaService.js';
import './OrdersList.css'

class OrderRow extends React.Component {
    render() {
        const order = this.props.order;
        const hash = this.props.hash;

        return (
            <tr>
                <td className="div-table-col">{hash}</td>
                <td className="div-table-col">{JSON.stringify(order)}</td>
            </tr>
        );
    }
}

class OrderTable extends React.Component {
    render() {
        const filterText = this.props.filterText;

        const rows = [];

        Object.values(this.props.orders).forEach((order) => {
            if (order.hash.indexOf(filterText) === -1) {
                return;
            }
            rows.push(
                <OrderRow
                    order={convertToJson(order)}
                    hash={order.hash}
                    key={order.hash}
                />
            );
        });

        return (
            <table className="div-table">
                <thead>
                    <tr>
                        <th className="div-table-col">Order Hash</th>
                        <th className="div-table-col">Order JSON</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </form>
        );
    }
}

export default class OrdersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            orders: {}
        };

        subscribe(orderJson => 
            parseJsonOrder(orderJson).then((order) => {
                this.setState(prevState => ({
                    orders: Object.assign({ [order.hash]: order }, prevState.orders)
                }))
            }),
            () => Object.values(this.state.orders)
        );

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

        setInterval(() => {
            const orders = Object.values(this.state.orders);
            const orderPromises = orders.map(order => validateOrderAsync(order).catch(() => null));
            Promise.all(orderPromises)
                .then(orders => orders.filter(x => x))
                .then(orders => orders.reduce((prev, curr) => Object.assign({ [curr.hash]: curr }, prev), {}))
                .then(orders => {
                    console.log(`Filtered orders length: ${Object.keys(orders).length}`)
                    this.setState({ orders })
                });
        }, 3000)
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <OrderTable
                    orders={this.state.orders}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}