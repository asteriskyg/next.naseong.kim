import type { Meta, StoryObj } from "@storybook/react";

import { ClipItem } from "@/components/ClipItem";

const meta = {
  title: "ClipItem",
  component: ClipItem,
} satisfies Meta<typeof ClipItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const clip = {
  contentId: "2e9d2fca549ee30046f9d56dcc69ea8f",
  contentName: "✈ 코리안 조커 씨랙님께 탈콥배우기 ✈ (!다시보기)",
  gameId: 491931,
  streamStartedAt: new Date("2023-01-18T11:56:29Z"),
  creatorId: 200469036,
  creatorName: "덤덤이",
  clipCreatedAt: new Date("2023-01-18T13:39:07.629Z"),
  clipDuration: 90,
  clipLastEdited: new Date("2023-01-18T13:39:07.629Z"),
  clipName: "TastyFragileEchidnaSuperVinlin-Iu4ZcJpnrhqQsqer",
  gameName: "Escape from Tarkov",
};

export const WithClip: Story = {
  args: { clip },
};
