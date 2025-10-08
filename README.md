# 🌟 Eventora Frontend (Angular 20)

Eventora is a **community-driven event management platform** designed to connect event organizers and attendees.  
This repository contains the **frontend implementation** built with **Angular 20**, consuming the Django REST API for event creation, registration, and discovery.

---

## 🎯 Project Overview

The Eventora Frontend provides an elegant and responsive user interface that enables:
- Organizers to **create, manage, and publish** events.
- Attendees to **discover, register, and track** events.
- A seamless event discovery experience with **search and filters**.

It’s built to communicate with the Eventora Django REST API via RESTful endpoints and features secure authentication using **JWT tokens**.

---

## 🧱 Tech Stack

| Category | Technology | Description |
|-----------|-------------|-------------|
| Framework | **Angular 20** | Core frontend framework |
| Styling | **Tailwind CSS** | Utility-first styling |
| State Management | **RxJS + Angular Services** | Reactive state handling |
| Routing | **Angular Router** | Client-side navigation |
| HTTP Client | **HttpClient (Angular)** | Communication with backend API |
| Authentication | **JWT Tokens** | Token-based login and authorization |
| Icons | **Lucide Icons / Heroicons** | Clean UI icons |
| Form Handling | **Reactive Forms** | Validation and user input handling |

---

## 🚀 Core Features

### 👤 Authentication
- Register and log in as **Organizer** or **Attendee**.
- Role-based UI control (different dashboards).
- Secure token storage and refresh.

### 🎉 Event Management (Organizer)
- Create, edit, and delete events.
- Upload banner images for events.
- Publish or unpublish events.
- View registration counts and event analytics.

### 🔍 Event Discovery (Attendee)
- Browse all published events.
- Search by title, location, or date.
- Filter by category and date range.
- View detailed event information.

### 🎟️ Ticket Registration
- Register for available events.
- View your active registrations.
- Prevent duplicate registrations.
- Receive registration confirmation.

---

## 🧩 Folder Structure

```
eventora-frontend/
│
├── src/
│   ├── app/
│   │   ├── core/                # Authentication, guards, interceptors
│   │   ├── features/
│   │   │   ├── auth/            # Login & register components
│   │   │   ├── events/          # Event CRUD and details
│   │   │   ├── registration/    # Ticket and user registration
│   │   └── shared/              # Shared components and UI elements
│   ├── assets/                  # Images, logos, and icons
│   ├── environments/            # API URLs and environment configs
│   └── styles.css               # Global Tailwind styles
│
├── package.json
├── angular.json
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/eventora-frontend.git
cd eventora-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8000/api'
};
```

### 4. Run Development Server
```bash
ng serve
```
Frontend will be available at **http://localhost:4200**

---

## 🔗 API Integration

The frontend communicates with the **Eventora Django REST API** using RESTful endpoints such as:

| Action | Endpoint | Method |
|--------|-----------|--------|
| Register | `/api/auth/register/` | POST |
| Login | `/api/auth/login/` | POST |
| List Events | `/api/events/` | GET |
| Create Event | `/api/events/` | POST |
| Event Details | `/api/events/{id}/` | GET |
| Register for Event | `/api/registrations/` | POST |

---

## 🎨 UI/UX Features

- **Responsive Design** – Optimized for mobile and desktop.
- **Modern UI Components** – TailwindCSS & Heroicons.
- **Loading and Error States** – Smooth feedback on all actions.
- **Dark Mode Ready** – Optional theme configuration.
- **Pagination & Filters** – Enhanced event discovery.

---

## 🧪 Testing

To run unit tests:
```bash
ng test
```

To run end-to-end tests:
```bash
ng e2e
```

---

## 🧠 Developer Notes

- Keep your access tokens secure; use `HttpInterceptor` for authorization headers.
- Utilize Angular Guards for route protection based on roles.
- Use lazy-loading modules for scalability.
- Reuse components from the `shared` directory to maintain consistency.

---

## 🧑‍💻 Contributors

- **Etornam** – Team Lead & API Developer  
- **Vifah Christable** – Frontend Developer (Angular 20)

---

## 🗓️ Project Timeline

| Sprint | Duration | Deliverables |
|--------|-----------|--------------|
| Sprint 1 | Week 1 | Authentication + Event Creation UI |
| Sprint 2 | Week 2 | Event Listing + Registration + Filtering |
| Sprint 3 | Week 3 | Testing, UI polish, Documentation |

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to fork, improve, and contribute!

---

## 📷 Screenshots (Coming Soon)
*Login Page* • *Event Dashboard* • *Registration Page* • *Event Details*

---

**Made with ❤️ using Angular 20 & TailwindCSS**
