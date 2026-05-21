import type { YouTubeWorkout } from "#/domain/schema";
import { Timer } from "lucide-react";
import { Card } from "./card";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import type { PropsWithChildren } from "react";

type YouTubeWorkoutCardProps = Readonly<
  PropsWithChildren<{
    workout: YouTubeWorkout;
  }>
>;

export function YouTubeWorkoutCard({
  workout,
  children,
}: YouTubeWorkoutCardProps) {
  return (
    <Card.Root>
      <Card.Head className="aspect-video">
        <LiteYouTubeEmbed
          id={workout.video_id}
          title={workout.title}
          lazyLoad
          autoplay
        />
      </Card.Head>
      <Card.Content className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-lexend font-black text-2xl text-white leading-tight tracking-tighter">
              {workout.title}
            </h3>
            <div className="flex items-center gap-2 text-lg">
              <Timer className="text-primary" size={20} />
              <span className="font-space-grotesk font-bold text-gray-500">
                {new Intl.DurationFormat("de", { style: "narrow" }).format(
                  workout.duration,
                )}
              </span>
            </div>
          </div>
          {children && <div>{children}</div>}
        </div>
      </Card.Content>
    </Card.Root>
  );
}
