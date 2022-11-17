import action from './action';
import analyticsEvent from './analyticsEvent';
import app from './app';
import blocks from './blocks';
import challenge from './challenge';
import common from './common';
import context from './context';
import email from './email';
import feedbackRule from './feedbackRule';
import hunting from './hunting';
import incident from './incident';
import industry from './industry';
import leaderboard from './leaderboard';
import marker from './marker';
import nps from './nps';
import organization from './organization';
import organizationOnboardingTask from './organizationOnboardingTask';
import organizationTrainingRule from './organizationTrainingRule';
import quest from './quest';
import questTemplate from './questTemplate';
import quiz from './quiz';
import quizModule from './quizModule';
import quizTemplate from './quizTemplate';
import reportingTrends from './reportingTrends';
import result from './result';
import rewards from './rewards';
import root from './root';
import services from './services';
import signinData from './signinData';
import tag from './tag';
import task from './task';
import taskGroup from './taskGroup';
import templates from './templates';
import threat from './threat';
import threatEmail from './threatEmail';
import threatObservable from './threatObservable';
import threatResource from './threatResource';
import trainingPackage from './trainingPackage';
import user from './user';
import userFeedback from './userFeedback';
import vector from './vector';

const schema = `
  directive @external on FIELD_DEFINITION | OBJECT | ENUM_VALUE | SCALAR | ENUM | INTERFACE | INPUT_OBJECT | SCHEMA
  schema @external {
    # HoxHunt GraphQL root query
    query: Query
    mutation: Mutation
  }
`;

export const getTypeDefs = () => [
  ...app(),
  ...common(),
  ...rewards(),
  ...context(),
  ...email(),
  ...marker(),
  ...organization(),
  ...organizationTrainingRule(),
  ...questTemplate(),
  ...quizTemplate(),
  ...quizModule(),
  ...quest(),
  ...templates(),
  ...user(),
  ...vector(),
  ...threatEmail(),
  ...threat(),
  ...threatObservable(),
  ...leaderboard(),
  ...tag(),
  ...services(),
  ...signinData(),
  ...taskGroup(),
  ...task(),
  ...incident(),
  ...industry(),
  ...action(),
  ...challenge(),
  ...reportingTrends(),
  ...analyticsEvent(),
  ...hunting(),
  ...blocks(),
  ...quiz(),
  ...result(),
  ...nps(),
  ...threatResource(),
  ...feedbackRule(),
  ...userFeedback(),
  ...root(),
  ...organizationOnboardingTask(),
  ...trainingPackage(),
  schema,
];
