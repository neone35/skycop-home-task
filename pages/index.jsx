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

  renderDropdown() {
    let dropdown = null;
    const { payload } = this.props.skycopRes;
    if (payload) {
      const dropdownOptions = payload.map(item => (item.title));
      const defaultOption = payload[0].title;
      dropdown = (
        <Dropdown
          options={dropdownOptions}
          onChange="asdasd"
          value={defaultOption}
          placeholder="Select an option"
        />
      );
    } else {
      dropdown = (
        <Dropdown value="No data received" />
      );
    }
    return dropdown;
  }

  render() {
    const { payload } = this.props.skycopRes;
    console.log(payload);
    // const defaultOption = payload[0].title;
    return (
      <div>
        <h1>Skycop dropdown</h1>
        <button
          style={{ margin: '0 auto' }}
          onClick={this.fetchSkycopResponse}
        >Fetch data
        </button>
        {this.renderDropdown()}
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
