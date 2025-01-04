import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, like, authUser }) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          like={like}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  // threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  vote: PropTypes.func,
  authUser: PropTypes.object,
};

export default ThreadList;
