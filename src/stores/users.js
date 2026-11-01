import { storeToRefs } from 'pinia';
import { createStore } from '@/utils/stores';
import { stringToHslColor } from '@/utils';
import { useAppStore } from '@/stores';

export const useUserStore = createStore('users', {
  self(state) {
    const { userId } = storeToRefs(useAppStore());
    if (!userId.value || !(userId.value in state.resources)) return {};
    const user = state.resources[userId.value];
    const name = `${user.firstName || ''} ${user.lastName || ''}`;
    return {
      ...user,
      fullName: name.trim(),
      initials: (user.firstName || '').slice(0, 1) + (user.lastName || '').slice(0, 1),
      color: stringToHslColor(name, 45, 45),
      textColor: stringToHslColor(name, 80, 95),
    };
  },
});