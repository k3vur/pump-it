import { Timer } from "lucide-react";
import type { PropsWithChildren } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import type { YouTubeWorkout } from "#/domain/schema";

import { Card } from "./card";

type YouTubeWorkoutCardProps = Readonly<
  PropsWithChildren<{
    workout: YouTubeWorkout;
  }>
>;

export function YouTubeWorkoutCard({ workout, children }: YouTubeWorkoutCardProps) {
  return (
    <Card.Root>
      <Card.Head className="aspect-video">
        <LiteYouTubeEmbed
          id={workout.video_id}
          title={workout.title}
          lazyLoad
          autoplay
          params={{ playsinline: "0" }}
        />
      </Card.Head>
      <Card.Content className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-lexend text-2xl leading-tight font-black tracking-tighter text-white">
            {workout.title}
          </h3>
          <div className="flex items-center gap-2 text-lg">
            <Timer className="text-primary" size={20} />
            <span className="font-space-grotesk font-bold text-gray-500">
              {new Intl.DurationFormat("de", { style: "narrow" }).format(workout.duration)}
            </span>
          </div>
        </div>
        {children && <div>{children}</div>}
      </Card.Content>
    </Card.Root>
  );
}
