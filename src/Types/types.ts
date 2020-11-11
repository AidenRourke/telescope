// Types bitch

export type Sizes = 'small' | 'regular';

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

export interface UserType {
  id: string;
  preferredUsername?: string;
  isAdmin?: boolean;
  cognitoId?: string;
}

export interface AccountType {
  id: string;
  user?: UserType;
  publisher?: PublisherType;
}

export interface PublisherType {
  id: string;
  name: string;
  accounts?: AccountType[];
  organizationFlag?: boolean;
  worlds?: WorldType[];
}

export interface WorldType {
  id: string;
  coverS3?: string;
  prerollS3?: string;
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

export type ColorTypes = 'white' | 'red' | 'green' | 'blue' | 'black';

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
}
