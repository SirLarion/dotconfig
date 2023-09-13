import { UserDetailsFragment } from '../../graphql/__generated__/FetchUserDetails.generated';

export const getFormFieldsFromUser = (user: UserDetailsFragment) => ({
  email: user.emails[0].address,
  firstName: user.profile.firstName,
  lastName: user.profile.lastName || '',
  department: user.profile.department,
  site: user.profile.site,
  isAnonymous: Boolean(user.profile.isAnonymous),
  uiLanguage: user.profile.locale?.ui,
  questLanguages: user.profile.locale?.quests ?? [],
  country: user.profile.country as UserDetailsFragment['profile']['country'],
  city: user.profile.city,
  gameMode: user.game.mode,
});

export type TUserFormFields = ReturnType<typeof getFormFieldsFromUser>;

export const getSubmittable = (
  user: UserDetailsFragment,
  {
    firstName,
    lastName,
    email,
    department,
    site,
    isAnonymous,
    uiLanguage,
    questLanguages,
    country,
    city,
    gameMode,
  }: TUserFormFields
) => ({
  user: {
    _id: user._id,
    emails: [{ address: email }],
    profile: {
      isAnonymous,
      locale: {
        ui: uiLanguage || undefined,
        quests: questLanguages,
      },
      // Only add fields below to mutation for non scim users
      ...(!user.scim?.lastProvisionedAt && {
        firstName,
        lastName,
        department,
        site,
        country,
        city,
      }),
    },
    game: {
      mode: gameMode,
    },
  },
});

export const userWithUpdatedRoles = (
  user: UserDetailsFragment,
  roles?: string[]
) => ({
  ...user,
  ...(roles && { roles }),
});
