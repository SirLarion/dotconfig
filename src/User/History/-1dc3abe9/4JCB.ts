import { atom } from 'recoil';

const currentTaskTag = atom<string | null>({
  key: 'onboarding-current-task-id',
  default: null,
});

export const onboardingState = {
  currentTaskTag,
};
