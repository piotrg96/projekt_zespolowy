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
        <div className="bg-secondary mt-4 py-5">
            <div className="text-center">TU BEDZIE WYSZUKIWARKA XDD</div>
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