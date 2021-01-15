import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { addPage } from "../../actions/pageActions";

import classnames from "classnames";

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			page: "",
			errors: {}
		};
	}

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};


	onSubmit = e => {
		e.preventDefault();

		const newPage = {
			page: this.state.page
		};

		this.props.addPage(newPage, this.props.history);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	render() {
		const { user } = this.props.auth;
		const { errors } = this.state;

		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="landing-copy col s12 center-align">
						<h4>
							<b>Hey there,</b> {user.name.split(" ")[0]}
						</h4>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChange}
									value={this.state.page}
									error={errors.name}
									id="page"
									type="text"
									className={classnames("", {
										invalid: errors.name
									})}
								/>
								<label htmlFor="name">Page name</label>
								<span className="red-text">{errors.name}</span>
							</div>
							<div className="col s12" style={{ paddingLeft: "11.250px" }}>
								<button type="submit" className="btn waves-effect waves-light hoverable blue accent-3"
								>Submit</button>
							</div>
						</form>
						<button
							style={{
								width: "150px",
								borderRadius: "3px",
								letterSpacing: "1.5px",
								marginTop: "1rem"
							}}
							onClick={this.onLogoutClick}
							className="btn btn-large waves-effect waves-light hoverable blue accent-3"
						>Logout</button>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser, addPage }
)(Dashboard);
