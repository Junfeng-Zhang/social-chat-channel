import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">这是您开始的聊天记录。</p>
      <p className="channel-empty__second">发送消息、附件、链接、表情符号等等！</p>
    </div>
  )

  return (
    <div className=" channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChannelContainer;