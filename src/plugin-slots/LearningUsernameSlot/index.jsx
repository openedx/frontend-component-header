import React from 'react';
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const LearningUsername = ({ username }) => (
  <>
    <FontAwesomeIcon icon={faUserCircle} className="d-md-none" size="lg" />
    <span data-hj-suppress className="d-none d-md-inline">
      {username}
    </span>
  </>
);

const LearningUsernameSlot = ({ username }) => (
  <PluginSlot
    id="learning_username_slot"
    slotOptions={{
      mergeProps: true,
    }}
  >
    <LearningUsername username={username} />
  </PluginSlot>
);

LearningUsername.propTypes = {
  username: PropTypes.string.isRequired,
};

LearningUsernameSlot.propTypes = LearningUsername.propTypes;

export default LearningUsernameSlot;
