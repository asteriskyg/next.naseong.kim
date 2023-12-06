declare module "type" {
  export type TwitchClientCredentialsType = {
    access_token: string;
    expires_in: number;
    token_type: "bearer";
  };

  export type IdentityType = {
    displayName: string;
    email: string;
    profileImageUrl: string;
    profileBackgroundUrl?: string;
    twitchUserId: number;
    userType: "broadcaster" | "editor" | "developer" | "viewer";
    follow?: Date;
    subscription?: number;
    registeredAt: Date;
  };

  export type UserType = {
    displayName: string;
    profileImageUrl: string;
    profileBackgroundUrl?: string;
    twitchUserId: number;
    userType: "broadcaster" | "editor" | "developer" | "viewer";
    follow?: Date;
    subscription?: number;
    registeredAt: Date;
  };

  export type StreamType = {
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

  export type StreamInfoType = {
    data: StreamType[];
  };

  export type ClipType = {
    clipCreatedAt: Date;
    clipDuration: number;
    clipLastEdited: Date;
    contentId: string;
    contentName: string;
    creatorId: number;
    creatorName: string;
    gameId: number;
    gameName: string;
    streamStartedAt: Date;
    clipName: string;
  };

  export type ClipListsType = ClipType[];

  export type ClipStatusType = {
    result: {
      default: {
        status: "inprogress" | "ready";
        url: string;
        percentComplete: number;
      };
    } | null;
    success: boolean;
    errors: [];
    messages: [];
  };
}
