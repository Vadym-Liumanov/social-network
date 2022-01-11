import React from 'react'

import styles from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    statusText: this.props.status || 'No status'
  }

  activateEditMode = () => {
    this.setState({ editMode: true })
  }

  deactivateEditMode = () => {
    this.props.updateMyStatus('11111')
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

export default (ProfileStatus)