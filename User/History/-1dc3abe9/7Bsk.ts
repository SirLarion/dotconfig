import { atom } from 'recoil';

const currentTaskTag = atom<string | null>({
  key: 'onboarding-current-task-id',
  default: null,
});

const showOnboarding = atom<boolean>({
  key: 'onboarding-show-guide',
  default: false,
});

export const onboardingState = {
  currentTaskTag,
  showOnboarding,
};
