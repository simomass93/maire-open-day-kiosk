export interface AudioTrack {
  id: number;
  title: string;
  title_en: string;
  author: string;
  audioSrc: string;
  coverImageSrc: string;
}

export interface ContentSection {
  title: string;
  subtitle: string;
  tracks: AudioTrack[];
  layout: 'contest' | 'podcast' | 'single-column';
  headerImageSrc: string;
  logoVariant: 'default' | 'fondazione';
}

export enum Page {
  Home,
  ContestHome,
  ToolTales,
  RouteTales,
  Podcast,
  Ingenium,
  Conversation,
}