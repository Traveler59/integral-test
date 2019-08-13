import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table } from 'react-bootstrap';
import * as moment from 'moment';
import './Tasks.scss';

const Importance = {
	Normal: 0,
	Important: 1,
	Critical: 2
}

export default class Tasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			selectors: ''
		};
	}

	render() {

		const tasks = [
			{ name: 'первая', discription: 'описание1', importance: Importance.Normal, dueTime: moment()},
			{ name: 'вторая', discription: 'описание2', importance: Importance.Important, dueTime: moment() }
		];


		return (
			<Col id='main' lg={{ span: 6, offset: 3 }} md={12}>
				<Table>
					<thead>
						<tr>
							<td>Название</td>
							<td>Описание</td>
							<td>Важность</td>
							<td>Время создания</td>
						</tr>
					</thead>
					<tbody>
						{tasks.map((t, i) => (
							<tr key={i}>
								<td >{t.name}</td>
								<td >{t.discription}</td>
								<td >{t.importance}</td>
								<td >{t.dueTime.format('DD MM') }</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Col>
		);
	}
}

Tasks.propTypes = {
};
