import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { toast } from 'ngx-sonner';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  let role = '';
  auth.getCurrentUser().subscribe({
    next: (res) => {
      role = res.role;
    },
    error: (err) => {
      toast.error("Failed to authenticate create Route")
      console.log(err)
    },
  });
  if (role === 'organizer') {
    return true;
  } else {
    toast.info(
      'Switch to Organizer mode in your profile to be able to create Events'
    );
    router.navigate(['/dashboard/profile']);
    return false;
  }
};
