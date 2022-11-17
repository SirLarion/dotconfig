import React from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import CommandMenu from './CommandMenu';
import { injectProps } from '../../components/higherOrderComponents';

const propInjector = () => {
  return {
    buttonElement: (
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    ),
  };
};

export const IconCommandMenu = injectProps(propInjector)(CommandMenu);

IconCommandMenu.propTypes = {
  ...CommandMenu.propTypes,
};

export default IconCommandMenu;
