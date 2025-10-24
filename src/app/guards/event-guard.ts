import { CanActivateFn } from '@angular/router';

export const eventGuard: CanActivateFn = (route, state) => {
  if (prompt("Data will be lost. Are you sure you want to leave this page?")) {
    return true;
  }

  return false
};
