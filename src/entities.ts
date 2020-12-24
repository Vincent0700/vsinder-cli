type Gender = 'female' | 'male' | 'non-binary';

export interface MatchItem {
  matchId: string;
  userId: string;
  displayName: string;
  flair: string;
  photoUrl: string;
  read: boolean;
  createdAt: number;
  message: any;
}

export interface FeedItem {
  id: string;
  displayName: string;
  flair: string;
  age: number;
  bio: string;
  photoUrl: string;
  codeImgIds: string[];
}

export interface UserItem {
  id: number;
  displayName: string;
  bio: boolean;
  flair: string;
  numLikes: number;
  photoUrl: string;
  codeImgIds: string[];
  hasPushToken: boolean;
  location: string;
  global: boolean;
  gender: Gender;
  genderToShow: Gender;
  gendersToShow: Gender[];
  goal: 'friendship' | 'love';
  ageRangeMax: number;
  ageRangeMin: number;
  birthday: string;
  unreadMatchUserIds: { userId1: string }[];
}
