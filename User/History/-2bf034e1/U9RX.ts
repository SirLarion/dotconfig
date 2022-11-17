import R from 'ramda';

import { appConfig } from '@server/app/appConfig';
import {
  EUserRole,
  getDefaultRoles,
  getDefaultUserRoles,
  getRoles,
} from '@server/domains/lib/auth/roles';
import { IUser } from '@server/lib/typedSchemas';

/**
 * Represents the authentication levels an identity can have
 */
export enum EIdentityAuthenticationLevel {
  UNAUTHENTICATED = 'unauthenticated',
  WEAK = 'weak',
  NORMAL = 'normal',
}

export type TAuthInfoUser = Pick<IUser, '_id' | 'organizationId'> &
  Partial<Pick<IUser, 'roles'>>;

export type TAuthInfo = {
  authenticationLevel: EIdentityAuthenticationLevel;
  user: TAuthInfoUser | undefined;
  impersonatorId?: string;
};
export interface IIdentity<
  T extends EIdentityAuthenticationLevel = EIdentityAuthenticationLevel
> {
  authenticationLevel: T;
  _id: IUser['_id'] | undefined;
  organizationId: IUser['organizationId'] | undefined;
  roles: EUserRole[];
  addedRoles?: EUserRole[];
  impersonatorId?: string | undefined;
}

export interface IUserIdentity
  extends IIdentity<
    EIdentityAuthenticationLevel.NORMAL | EIdentityAuthenticationLevel.WEAK
  > {
  _id: IUser['_id'];
  organizationId: IUser['organizationId'];
  roles: EUserRole[];
  impersonatorId?: string;
}

interface IAnonymousIdentity
  extends IIdentity<EIdentityAuthenticationLevel.UNAUTHENTICATED> {
  _id: undefined;
  organizationId: undefined;
  roles: EUserRole[];
  impersonatorId?: undefined;
}

export class Identity<
  T extends EIdentityAuthenticationLevel = EIdentityAuthenticationLevel
> implements IIdentity<T>
{
  /**
   * @deprecated Use `getAuthenticationLevel()` instead
   */
  public authenticationLevel: T;
  /**
   * @deprecated Use `getId()` instead
   */
  public _id: IUser['_id'] | undefined;
  /**
   * @deprecated Use `getOrganizationId()` instead
   */
  public organizationId: IUser['organizationId'] | undefined;
  /**
   * @deprecated Use `getUserRoles()` or `getEffectiveRoles()` instead
   */
  public roles: EUserRole[];
  /**
   * @deprecated Use `getAddedRoles()` or `getEffectiveRoles()` instead
   */
  public addedRoles: EUserRole[];
  /**
   * @deprecated Use `getImpersonatorId()` instead
   */
  public impersonatorId?: string | undefined;

  constructor(props: IIdentity<T>) {
    this.authenticationLevel = props.authenticationLevel;
    this._id = props._id;
    this.organizationId = props.organizationId;
    this.impersonatorId = props.impersonatorId;
    this.roles = R.uniq(getDefaultRoles().concat(props.roles || []));
    this.addedRoles = props.addedRoles ? R.uniq(props.addedRoles) : [];
  }

  getAuthenticationLevel = () => {
    return this.authenticationLevel;
  };
  getId = () => {
    return this._id;
  };
  getOrganizationId = () => {
    return this.organizationId;
  };
  getUserRoles = () => {
    return this.roles;
  };
  getAddedRoles = () => {
    return this.addedRoles;
  };
  getImpersonatorId = () => {
    return this.impersonatorId;
  };

  getEffectiveRoles = () => {
    return this.getUserRoles().concat(this.getAddedRoles());
  };
  getEffectiveId = () => {
    return this.getImpersonatorId() || this.getId();
  };

  hasRole = (role: EUserRole) => {
    return this.getEffectiveRoles().includes(role);
  };

  toProps = (): IIdentity<T> => ({
    authenticationLevel: this.authenticationLevel,
    _id: this._id,
    organizationId: this.organizationId,
    impersonatorId: this.impersonatorId,
    roles: this.roles,
    addedRoles: this.addedRoles,
  });
}

export class AnonymousIdentity
  extends Identity<IAnonymousIdentity['authenticationLevel']>
  implements IAnonymousIdentity
{
  public _id: undefined;
  public organizationId: undefined;
  public impersonatorId?: undefined;

  constructor(props: Partial<Pick<IAnonymousIdentity, 'roles'>>) {
    super(
      R.mergeRight(props, {
        roles: props.roles || [],
        authenticationLevel: EIdentityAuthenticationLevel.UNAUTHENTICATED,
        _id: undefined,
        organizationId: undefined,
      })
    );
  }
}
export class UserIdentity
  extends Identity<IUserIdentity['authenticationLevel']>
  implements IUserIdentity
{
  public _id: IUser['_id'];
  public organizationId: IUser['organizationId'];
  public impersonatorId?: string;

  constructor(props: IUserIdentity) {
    super(R.assoc('roles', getDefaultUserRoles().concat(props.roles), props));
  }
}

export const createIdentity = <T extends EIdentityAuthenticationLevel>(
  props: IIdentity<T>
) => new Identity(props);

export const createAnonymousIdentity = (
  data: Partial<Pick<IAnonymousIdentity, 'roles'>> = {}
) => new AnonymousIdentity(data);
export const createUserIdentity = (data: IUserIdentity) =>
  new UserIdentity(data);

export const addRoles = <T extends EIdentityAuthenticationLevel>(
  identity: Identity<T>,
  roles: EUserRole[]
): Identity<T> => {
  const identityProps = identity.toProps();
  const newIdentityProps = R.mergeRight(identityProps, {
    addedRoles: identityProps.addedRoles.concat(roles),
  });
  return new Identity<T>(newIdentityProps);
};

export const getIdentity = (info: TAuthInfo) => {
  // Add protection from illogical arguments. Although the types try
  // to prevent this, it's still possible to do in some circumstances.
  if (
    !info.user &&
    info.authenticationLevel !== EIdentityAuthenticationLevel.UNAUTHENTICATED
  ) {
    throw new Error('Cannot create authenticated identity without a user');
  }

  return info.authenticationLevel ===
    EIdentityAuthenticationLevel.UNAUTHENTICATED
    ? createAnonymousIdentity()
    : createUserIdentity({
        _id: info.user._id,
        organizationId: info.user.organizationId,
        roles: getRoles(!appConfig.auth.enableSuperAdminAccess, info.user),
        authenticationLevel: info.authenticationLevel,
        impersonatorId: info.impersonatorId || undefined,
      });
};

export const getNormallyAuthenticatedIdentity = (
  props: Omit<TAuthInfo, 'authenticationLevel'>
) =>
  getIdentity({
    ...props,
    authenticationLevel: EIdentityAuthenticationLevel.NORMAL as const,
  });

export const hasAuthenticationLevel = (
  identity: Identity,
  level: EIdentityAuthenticationLevel
) => identity.getAuthenticationLevel() === level;

export const isUnauthenticated = (
  identity: Identity
): identity is AnonymousIdentity =>
  hasAuthenticationLevel(
    identity,
    EIdentityAuthenticationLevel.UNAUTHENTICATED
  );

export const isAuthenticated = (identity: Identity): identity is UserIdentity =>
  !isUnauthenticated(identity);
