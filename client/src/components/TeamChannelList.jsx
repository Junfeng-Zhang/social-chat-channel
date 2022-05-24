import React from 'react';

import { AddChannel } from '../assets';

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  if (error) {
    return type === 'team' ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          连接错误，请稍等，然后重试。
        </p>
      </div>
    ) : null
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === 'team' ? 'Channels' : 'Messages'} 加载中...
        </p>
      </div>
    )
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === 'team' ? '频道' : '群聊'}
        </p>

        {/* button - 新建频道 */}
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList