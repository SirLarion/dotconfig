export interface IGQLUserFields {
  _id: string;
  status: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  emails: IUserEmail[];
  profile: IUserProfile;
  game: IUserGame;
  organization: IOrganization;
  player: IPlayer;
  events: IUserEvent[];
}

interface IUserEmail {
  address: string;
}

interface IUserLocale {
  ui: string;
  quests: any[];
  latest: string;
  tzOffset: number;
  tz: string;
}

interface IUserProfile {
  firstName: string;
  lastName: string;
  phone?: any;
  department?: any;
  country?: any;
  isAnonymous: boolean;
  locale: IUserLocale;
}

interface IUserGame {
  active: boolean;
  activatedAt: Date;
  mode: string;
}

interface IUserSso {
  enabled: boolean;
}

interface IOrganization {
  _id: string;
  name: string;
  sso: IUserSso;
}

interface IUserStats {
  success: number;
  failed: number;
  missed: number;
  total: number;
  last10Quests: string[];
  failureRate: number;
}

interface IPlayer {
  stars: number;
  stats: IUserStats;
}

interface IUserEvent {
  eventName: string;
  eventCount: number;
  firstSeenAt: Date;
  lastSeenAt: Date;
}
