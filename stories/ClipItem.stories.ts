import type { Meta, StoryObj } from "@storybook/react";

import { ClipItem } from "../components/ClipItem";

const meta: Meta<typeof ClipItem> = {
  title: "ClipItem",
  component: ClipItem,
  // ...
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithClip: Story = {
  args: {
    clip: {
      clipCreatedAt: new Date(),
      clipDuration: 90,
      clipLastEdited: new Date(),
      contentId: "string",
      contentName: "string",
      creatorId: 1,
      creatorName: "string",
      gameId: 1,
      gameName: "string",
      streamStartedAt: new Date(),
      clipName: "string",
    },
  },
};
