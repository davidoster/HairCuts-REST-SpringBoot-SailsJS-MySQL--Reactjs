import React, { Component } from "react";
import HairCutsDataService from "../services/haircuts.service";
import { Link } from "react-router-dom";

export default class HairCutsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveHairCuts = this.retrieveHairCuts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveHairCut = this.setActiveHairCut.bind(this);
    this.removeAllHairCutss = this.removeAllHairCuts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      haircuts: [],
      currentHairCut: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveHairCuts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveHairCuts() {
    HairCutsDataService.getAll()
      .then(response => {
        this.setState({
          haircuts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveHairCuts();
    this.setState({
      currentHairCut: null,
      currentIndex: -1
    });
  }

  setActiveHairCut(haircut, index) {
    this.setState({
      currentHairCut: haircut,
      currentIndex: index
    });
  }

  removeAllHairCuts() {
    HairCutsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentHairCut: null,
      currentIndex: -1
    });

    HairCutsDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          haircuts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, haircuts, currentHairCut, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>HairCuts List</h4>

          <ul className="list-group">
            {haircuts &&
              haircuts.map((haircut, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveHairCut(haircut, index)}
                  key={index}
                >
                  {haircut.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllHairCuts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentHairCut ? (
            <div>
              <h4>HairCut</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentHairCut.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentHairCut.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentHairCut.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/haircuts/" + currentHairCut.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a HairCut...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
