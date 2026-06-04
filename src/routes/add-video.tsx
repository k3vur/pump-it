import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageTitle } from "#/components/layout/page-title";
import { Section } from "#/components/layout/section";
import { Button } from "#/components/ui/button";
import { YouTubeWorkoutCard } from "#/components/ui/youtube-workout-card";
import { addAvailableWorkout, availableWorkoutsCollection, type Workout } from "#/domain";
import { durationFromSeconds } from "#/temporals/temporals-utils";
import { FetchVideoForm } from "#/youtube/fetch-video-form";
import { type VideoInformation } from "#/youtube/fetch-video-information";

export const Route = createFileRoute("/add-video")({
  component: RouteComponent,
});

function RouteComponent() {
  const [videoInformation, setVideoInformation] = useState<null | VideoInformation>(null);
  const workout = videoInformation !== null ? videoInformationToWorkout(videoInformation) : null;
  const { data: existingWorkout } = useLiveQuery(
    (q) =>
      q
        .from({ availableWorkout: availableWorkoutsCollection })
        .where(({ availableWorkout }) => eq(availableWorkout.video_id, workout?.video_id))
        .findOne(),
    [workout?.video_id],
  );
  return (
    <>
      <PageTitle>Add Workout</PageTitle>
      <FetchVideoForm onReceiveVideoInformation={setVideoInformation} />
      {workout && (
        <Section.Root>
          <Section.Title>Preview</Section.Title>
          <Section.Content>
            <YouTubeWorkoutCard workout={workout}>
              <div className="flex flex-col gap-4">
                {existingWorkout === undefined ? (
                  <Button onClick={() => addAvailableWorkout(workout)}>Add to Workouts</Button>
                ) : (
                  <div>Workout is already in List</div>
                )}
              </div>
            </YouTubeWorkoutCard>
          </Section.Content>
        </Section.Root>
      )}
    </>
  );
}

function videoInformationToWorkout(videoInformation: VideoInformation): Workout {
  return {
    id: videoInformation.videoId,
    type: "youtube",
    duration: durationFromSeconds(videoInformation.durationInSeconds),
    title: videoInformation.title,
    video_id: videoInformation.videoId,
  };
}
