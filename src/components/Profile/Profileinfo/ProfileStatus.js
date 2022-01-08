import React from 'react'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    statusText: this.props.status
  }

  activateEditMode = () => {
    this.setState({ editMode: true })
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false })
  }

  updateStatus = (e) => {
    this.setState({ statusText: e.target.value })
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.state.statusText}</span>
          </div>
        }

        {this.state.editMode &&
          <div>
            <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.statusText} onChange={this.updateStatus} />
          </div>
        }
      </div>
    )
  }
}

export default ProfileStatus