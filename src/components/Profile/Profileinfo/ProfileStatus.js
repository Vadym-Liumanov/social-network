import React from 'react'

import styles from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    statusText: this.props.status
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({ statusText: this.props.status })
    }
  }

  activateEditMode = () => {
    this.setState({ editMode: true })
  }

  deactivateEditMode = () => {
    if (this.state.statusText !== this.props.status) {
      this.props.updateMyStatus(this.state.statusText)
    }
    this.setState({ editMode: false })
  }

  updateStatus = (e) => {
    this.setState({ statusText: e.target.value })
  }

  render() {
    return (
      <div className={styles.status}>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.state.statusText || 'No status'}</span>
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

export default (ProfileStatus)