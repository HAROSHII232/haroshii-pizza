"use client";

import { useEffect, useState } from "react";
import ReactStories from "react-insta-stories";
import { X as CloseIcon } from "lucide-react";

import { cn } from "@/shared/lib";
import { API } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";

import { Container } from "./container";
import { Skeleton } from "../ui";

type Props = {
  className?: string;
};

export const Stories = ({ className }: Props) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const stories = await API.stories.getAll();
      setStories(stories);
    }
    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        className={cn(
          "flex items-center justify-between gap-2 my-10",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <Skeleton key={index} className="w-[200px] h-[250px]"></Skeleton>
          ))}

        {stories.map((story) => (
          <img
            key={story.id}
            width={200}
            height={250}
            src={story.previewImageUrl}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            alt="storie"
          />
        ))}

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 520 }}>
              <button
                className="absolute -right-10 -top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
