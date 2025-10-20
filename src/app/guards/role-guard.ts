import { inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { toast } from 'ngx-sonner';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user:any = localStorage.getItem('user')
  auth.getCurrentUser().subscribe({
    next: (res) => {
      console.log("Response",res.role)
    },
    error: (err) => {
      toast.error("Failed to authenticate create Route")
      console.log(err)
    },
  });

  if (user.role === "organizer") {
    return true;
  } else {
    console.log(user)
    toast.info(
      'Switch to Organizer mode in your profile to be able to create Events'
    );
    router.navigate(['/dashboard/profile']);
    return false;
  }
};
