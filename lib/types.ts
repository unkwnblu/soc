export type UserRole = "admin" | "editor";

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  author_id?: string;
  author?: Profile;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

export interface Announcement {
  id: string;
  message: string;
  cta_url?: string;
  is_active: boolean;
  expires_at?: string;
  created_at: string;
}

export interface Playlist {
  id: string;
  title: string;
  embed_url: string;
  platform: "spotify" | "apple_music" | "soundcloud" | "youtube";
  description?: string;
  created_at: string;
}
