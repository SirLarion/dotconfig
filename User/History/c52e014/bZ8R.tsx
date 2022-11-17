import React from 'react';
import { Enzyme } from '../../../../npm/Enzyme';
import { IUserAvatarProps, UserAvatarView, UserAvatar } from '..';
import { GetCurrentUserAvatarDocument } from '../__generated__/GetCurrentUserAvatar.generated';
import { matchTestId, timeout } from '../../../../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { muiV1Theme } from '../../../../styles/HoxhuntBaseTheme';

const theme = createMuiTheme(muiV1Theme);

const setup = async (propOverrides: Partial<IUserAvatarProps> = {}) => {
  const props = {
    fullName: 'Nancy Sinatra',
    initials: 'NS',
    email: 'nancy.sinatra@walkingboots.com',
    ...propOverrides,
  };

  const componentWrapper = Enzyme.mount(
    <MuiThemeProvider theme={theme}>
      <UserAvatarView {...props} />
    </MuiThemeProvider>
  );

  const mocks = [
    {
      request: {
        query: GetCurrentUserAvatarDocument,
      },
      result: {
        data: {
          currentUser: {
            _id: '123',
            profile: {
              firstName: 'Frank',
              lastName: 'Sinatra',
            },
            emails: [
              {
                address: 'frank.sinatra@moonflight.com',
              },
            ],
          },
        },
      },
    },
  ];

  const queryComponentWrapper = Enzyme.mount(
    <MuiThemeProvider theme={theme}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserAvatar />
      </MockedProvider>
    </MuiThemeProvider>
  );

  await timeout(0);

  return { componentWrapper, queryComponentWrapper, props };
};

describe('<UserAvatar />', () => {
  afterEach(() => {
    Enzyme.unmountAll();
  });

  it('should passed textual content be found in component', async () => {
    const { componentWrapper } = await setup();
    expect(
      componentWrapper.findWhere(matchTestId('profile-name')).text()
    ).toEqual('Nancy Sinatra');

    expect(
      componentWrapper.findWhere(matchTestId('profile-initials')).text()
    ).toEqual('NS');
  });

  it('should trigger query and return mocked data to component', async () => {
    const { queryComponentWrapper } = await setup();

    expect(
      queryComponentWrapper.findWhere(matchTestId('profile-name')).text()
    ).toEqual('Frank Sinatra');

    expect(
      queryComponentWrapper.findWhere(matchTestId('profile-initials')).text()
    ).toEqual('FS');
  });
});
