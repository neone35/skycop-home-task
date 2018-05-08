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
    console.log(value);
    // const defaultOption = payload[0].title;
    return (
      <div className="formWrapper">
        <h2>Skycop dropdown</h2>
        <button
          className="buttonStyle"
          onClick={this.props.fetchSkycopResponse}
        >Fetch data
        </button>
        {this.renderDropdown()}
        <br />
        <p>You selected id# <br /> {value}</p>
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
