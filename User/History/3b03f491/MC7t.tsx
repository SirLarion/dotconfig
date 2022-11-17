import { Query } from '../../utils/apollo';
import { IUserEmail } from '../../models/user';

interface IData {
  emails: IUserEmail[];
}

export class CurrentUserEmailQuery extends Query<{ currentUser: IData }> {}
