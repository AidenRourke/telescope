// Types bitch

export interface TagType {
  id: string;
  name: string;
}

export interface PostType {
  id: string;
  description?: string;
  frame1S3: string;
  frame2S3?: string;
  frame3S3?: string;
  frame4S3?: string;
  preferredUsername?: string;
  tags?: TagType[];
  title?: string;
}

export interface UserAccountType {
  id: string;
  user: {
    id: string;
    preferredUsername: string;
  };
}

export interface PublisherType {
  id: string;
  name: string;
  accounts: UserAccountType[];
}

export interface WorldType {
  id: string;
  coverS3?: string;
  title?: string;
  description?: string;
  posts?: PostType[];
  publishers?: PublisherType[];
}

export interface FilterType {
  type: string;
  name: string;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}
