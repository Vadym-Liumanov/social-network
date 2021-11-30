import React from 'react'

const Users = (props) => {
  return (
    <div>
      <div>
        {
          props.usersList.map((user) => {
            return (
              <div key={user.id}>
                <span>
                  <div>
                    <img src="#" alt="avatarka" />
                  </div>
                  <div>
                    <button>
                      FOLLOW
                    </button>
                  </div>
                </span>

                <span>
                  <div>
                    {user.fullName}
                  </div>
                  <div>
                    {user.status}
                  </div>
                  <div>
                    {user.location.city}, {user.location.country}
                  </div>
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Users