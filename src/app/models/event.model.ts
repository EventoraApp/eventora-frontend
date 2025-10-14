export interface EventRecord {
  id: number;                 // PK
  organizer_id: number;       // FK -> users
  title: string;
  description: string;
  location: string;
  event_date: string;         // YYYY-MM-DD (use ISO string)
  event_time: string;         // HH:MM:SS (or "10:00")
  capacity: number;
  category: string;
  image?: string | null;      // URL or null
  is_published: boolean;
  created_at: string;         // ISO Date string
  updated_at: string;         // ISO Date string
}
