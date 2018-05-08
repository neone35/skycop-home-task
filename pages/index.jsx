import withRedux from 'next-redux-wrapper';
import Dropdown from 'react-dropdown';
import React from 'react';
import { initStore, fetchSkycopResponse } from '../store';
import '../static/style.css';

class Index extends React.Component {
  // static getInitialProps ({ store, isServer }) {
  //   store.dispatch(fetchSkycopResponse(isServer))
  //   return { isServer }
  // }
  constructor(props) {
    super(props);
    this.state = {
      selected: { value: null, label: null },
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(option) {
    this.setState({
      selected: option,
    });
  }

  renderDropdown() {
    let dropdown = null;
    const { payload } = this.props.skycopRes;
    if (payload) {
      const dropdownTitles = payload.map(item => (item.title));
      const dropdownIds = payload.map(item => (item.id));
      const defaultOption = payload[0].title;
      const options = payload.map((item, index) =>
        ({
          label: dropdownTitles[index],
          value: dropdownIds[index],
        }));
      // console.log(options);
      dropdown = (
        <Dropdown
          options={options}
          onChange={this.handleSelect}
          value={defaultOption}
        />
      );
    } else {
      dropdown = (
        <Dropdown disabled value="No data received" />
      );
    }
    return dropdown;
  }

  render() {
    const { value } = this.state.selected;
    // const defaultOption = payload[0].title;
    return (
      <div className="formWrapper">
        <div className="jumbotron">
          <h1 className="display-4">Skycop dropdown</h1>
          <p className="lead" style={{ fontSize: '1em' }}>You have to create a simple React/React-Redux App that `fetches` a response into Redux state, displays a dropdown with the results, and upon changing a selection, it`s value (not title) has to be displayed somewhere.</p>
          <hr className="my-4" />
          <div className="lead">
            <p>
              You selected id# <br />
              <span style={{ color: '#33BB6C' }} >{value}</span>
            </p>
            {this.renderDropdown()}
            <button
              className="buttonStyle btn btn-outline-primary"
              onClick={this.props.fetchSkycopResponse}
            >
              Fetch data
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    skycopRes: state.skycopReducer,
  };
}

export default withRedux(initStore, mapStateToProps, { fetchSkycopResponse })(Index);
