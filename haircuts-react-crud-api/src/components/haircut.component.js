import React, { Component } from "react";
import HairCutDataService from "../services/haircuts.service";

export default class HairCut extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getHairCut = this.getHairCut.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateHairCut = this.updateHairCut.bind(this);
    this.deleteHairCut = this.deleteHairCut.bind(this);

    this.state = {
      currentHairCut: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getHairCut(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentHairCut: {
          ...prevState.currentHairCut,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentHairCut: {
        ...prevState.currentHairCut,
        description: description
      }
    }));
  }

  getHairCut(id) {
    HairCutDataService.get(id)
      .then(response => {
        this.setState({
          currentHairCut: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentHairCut.id,
      title: this.state.currentHairCut.title,
      description: this.state.currentHairCut.description,
      published: status
    };

    HairCutDataService.update(this.state.currentHairCut.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentHairCut: {
            ...prevState.currentHairCut,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateHairCut() {
    HairCutDataService.update(
      this.state.currentHairCut.id,
      this.state.currentHairCut
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The HairCut was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteHairCut() {    
    HairCutDataService.delete(this.state.currentHairCut.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/haircuts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentHairCut } = this.state;

    return (
      <div>
        {currentHairCut ? (
          <div className="edit-form">
            <h4>HairCut</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentHairCut.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentHairCut.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentHairCut.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentHairCut.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteHairCut}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateHairCut}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a HairCut...</p>
          </div>
        )}
      </div>
    );
  }
}
