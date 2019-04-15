import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class Search extends React.Component {

    componentDidMount()
    {
        this.props.dispatch(userActions.getAll());
    }

    render() {
 
    return (    
        <div className="bg-secondary mt-4 py-1">
            <div className="px-5 py-4">
                <h4>Search notice</h4>
                <form className="needs-validation" noValidate>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name" defaultValue="" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="province">Province</label>
                            <input type="text" className="form-control" id="province" placeholder="province" defaultValue="" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="category">Category</label>
                            <input type="text" className="form-control" id="category" placeholder="Category" defaultValue="" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" placeholder="City" required/>
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="fromPrice">Price from</label>
                            <input type="text" className="form-control" id="fromPrice" placeholder="Price from" required/>
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="priceTo">Price to</label>
                            <input type="text" className="form-control" id="priceTo" placeholder="Price to" required/>
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="fromYardage">Yardage from</label>
                            <input type="text" className="form-control" id="fromYardage" placeholder="Yardage from" required/>
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="yardageTo">Yardage to</label>
                            <input type="text" className="form-control" id="yardageTo" placeholder="Yardage to" required/>
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="sortBy">Sort by</label>
                            <input type="text" className="form-control" id="sortBy" placeholder="Sort by" required/>
                            <div className="invalid-feedback">
                                Please provide a valid city.
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
         
            </div>
        </div>
    );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedSearch = connect(mapStateToProps)(Search);
export { connectedSearch as Search };