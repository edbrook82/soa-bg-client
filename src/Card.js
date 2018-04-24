import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: ''
    }
  }

  onChange = event => {
    this.setState({
      units: event.target.value
    });
  };

  render() {
    const { units } = this.state;
    const { isLoading, title, cost, kwh, prompt, onSubmit } = this.props;
    let result;
    if (!isLoading) {
      result = (
        <div className="col">
          <h1 className="display-4 text-center">&pound; {cost || '--.--'}</h1>
          <p className="h3 text-center">{kwh || '---.--'} KWh</p>
        </div>);
    } else {
      result = (
        <div className="col">
          <p className="h4 text-center">Submitting reading...</p>
        </div>);
    }
    return (
      <div className="card">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col">
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text"
                        className="form-control"
                        placeholder={prompt || ''}
                        value={units}
                        onChange={this.onChange}/>
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={_ => onSubmit(units)}>Submit Reading</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              {result}
            </div>
          </div>
        </div>
      </div>);
  }
}

export default Card;