declare module 'type' {
  export type StreamInfoType = {
    id: number;
    user_id: number;
    user_login: string;
    user_name: string;
    game_id: number;
    game_name: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: Date;
    language: string;
    thumbnail_url: string;
    tag_ids: string[];
    tags: string[];
    is_mature: boolean;
  };

  export type IdentityType = {
    displayName: string;
    email: string;
    profileImageUrl: string;
    profileBackgroundUrl: string;
    twitchUserId: number;
    userType: string;
    follow: Date | undefined;
    subscription: number | undefined;
  };

  export type ClipListsType = Clip[];
}