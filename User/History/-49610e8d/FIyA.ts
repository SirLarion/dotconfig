import path from 'path';
import R from 'ramda';

import { insertQuestTemplates } from '@server/domains/lib/developDataGenerator/generators/questTemplate';
import { insertQuizData } from '@server/domains/lib/developDataGenerator/generators/quiz';
import { loadDevEnv } from '@server/startup/devEnv';

import { insertHoxhunt, insertWaywardSystems } from './generators/organization';
import { insertDeveloperUser, insertRandomUsers } from './generators/user';

const isDevelopmentEnvironment = () => process.env.NODE_ENV === 'development';

if (!isDevelopmentEnvironment()) {
  throw new Error(
    'Development data generation script can only be run when NODE_ENV = "development"'
  );
}

const getPackageRootPath = () => {
  const root = process.env.PACKAGE_ROOT_DIR || process.cwd();

  return path.isAbsolute(root) ? root : path.join(process.cwd(), root);
};

const paths = {
  root: getPackageRootPath(),
  private: path.join(getPackageRootPath(), 'private'),
};

loadDevEnv(path.join(paths.private, '.env'));

const parseBoolean = (value: string) => value && value === 'true';

const config = {
  developerUserEmail: process.env.DEVELOPER_USER_EMAIL,
  developerUserIsSuperAdmin: parseBoolean(
    process.env.DEVELOPER_USER_IS_SUPER_ADMIN
  ),
};

if (!config.developerUserEmail) {
  throw new Error(
    'Set the required DEVELOPER_USER_EMAIL variable to run this script.'
  );
}

const generateDevelopmentData = () =>
  insertHoxhunt({ developerEmail: config.developerUserEmail })
    .then(organization =>
      insertDeveloperUser({
        emailAddress: config.developerUserEmail,
        isSuperAdmin: config.developerUserIsSuperAdmin,
        organizationId: organization._id,
      }).then(R.always(organization))
    )
    .then(insertRandomUsers({ count: 100 }))
    .then(() =>
      insertWaywardSystems({ developerEmail: config.developerUserEmail })
    )
    .then(insertRandomUsers({ count: 100 }))
    .then(insertQuestTemplates)
    .then(insertQuizData)
    .catch(error => {
      console.error(error);
      process.exit(1);
    })
    .then(() => process.exit());

generateDevelopmentData();
