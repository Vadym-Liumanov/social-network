import React from 'react'

import myPostsStyles from'./MyPosts.module.css'

const Profile = () => {
  return (
    <div className={myPostsStyles.content}>
      <div>
        <img src="https://oboitd.ru/images/goods/big/20200125110231_Priroda_10-344.jpg" alt="nature" />
      </div>
      <div>
        Avatar + description
      </div>
      <div>
        My posts
        <div>
          New post
        </div>
      </div>
      <div>
        Posts
        <div className={myPostsStyles.item}>
          post1
        </div>
        <div>
          post2
        </div>
        <div>
          post3
        </div>
      </div>

    </div>
  );
}

export default Profile
