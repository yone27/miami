import React, { Component } from "react";
import { connect } from "react-redux";
import { getPage } from "../../actions/pageActions";

class Page extends Component {
    constructor() {
        super();
        this.state = {
            page: {},
            errors: {}
        };
    }

    componentWillMount() {
        this.props.getPage(this.props.match.params.page);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.page) {
            this.setState({
                page: nextProps.page
            });
        }
    }

    render() {
        const { errors } = this.state;
        const { url } = this.state.page;
        const { page } = this.state.page;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">

                    <div className="landing-copy col s12 center-align">
                        {errors.value ? (
                            <h4>
                                {errors.value}
                            </h4>
                        ) : (
                                <div>
                                    <h3>This page is for {page} </h3>
                                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                        <a href={url} className="btn waves-effect waves-light hoverable blue accent-3"
                                        >Share link</a>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    page: state.page,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getPage }
)(Page);
