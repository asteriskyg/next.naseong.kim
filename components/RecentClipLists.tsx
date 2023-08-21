'use client';

import { useState } from 'react';
import axios from 'axios';

import type { ClipListsType, ClipType } from 'type';

import { ClipItem } from './ClipItem';

export const renderClips = (clips: ClipListsType | undefined) => {
  if(!clips) {
    return undefined;
  }

  return clips.map((clip: ClipType) => {
    return (
      <ClipItem
        key={clip.contentId}
        clip={clip}
      />
    )
  })
}

export const RecentClipLists = ({ clipLists }: { clipLists: ClipListsType | undefined }) => {
  const [clips, setClips] = useState(clipLists);
  const [clipIndex, setClipIndex] = useState(1);

  const loadMore = async() => {
    if(!clips) {
      return undefined;
    }

    const newClips = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/clip/recent?offset=${clipIndex}`)
    .catch(() => {
      return undefined;
    });
  
    setClipIndex(clipIndex + 1);
    setClips(clips.concat(newClips?.data));
    renderClips(clips);

    return 1;
  }

  return(
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {renderClips(clips)}
      </div>
      <div
        className="mt-6 flex w-full items-center justify-center"
      >
        <button
          type="button"
          onClick={loadMore}
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          더보기
        </button>
      </div>
    </div>
  )
}

