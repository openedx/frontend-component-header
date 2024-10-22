import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@openedx/paragon';

const LearningLoggedOutButtons = ({ buttonsInfo }) => buttonsInfo.map(buttonInfo => (
  <Button
    className="ml-3"
    variant={buttonInfo.variant ?? 'outline-primary'}
    href={buttonInfo.href}
  >
    {buttonInfo.message}
  </Button>
));

export const learningHeaderLoggedOutItemsDataShape = {
  buttonsInfo: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
    variant: PropTypes.string,
  })),
};

LearningLoggedOutButtons.propTypes = learningHeaderLoggedOutItemsDataShape;

export default LearningLoggedOutButtons;
