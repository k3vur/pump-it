/*
 * This uses the [youtube iframe api](https://developers.google.com/youtube/iframe_api_reference) to load
 * video information based on a video id.
 *
 * The iframe api is very oldschool JS but requires no API keys. Hence we have all these any and ts-ignore hacks.
 */

type Player = {
  destroy: () => void;
  getDuration: () => number;
  getVideoData: () => { title: string };
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: { new (divId: string, options: any): Player };
    };
  }
}

let singletonScriptLoadedPromise: PromiseWithResolvers<void> | null = null;

async function loadYouTubeApiScript(): Promise<void> {
  // in some hot reload scenarios, the YT player might already be loaded
  if (window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  if (singletonScriptLoadedPromise === null) {
    singletonScriptLoadedPromise = Promise.withResolvers();

    window.onYouTubeIframeAPIReady = () => {
      singletonScriptLoadedPromise?.resolve();
    };

    const scriptTag = document.createElement("script");
    scriptTag.src = "https://www.youtube.com/iframe_api";
    document.head.append(scriptTag);
  }
  return singletonScriptLoadedPromise.promise;
}

void loadYouTubeApiScript();

export type VideoInformation = Readonly<{
  videoId: string;
  durationInSeconds: number;
  title: string;
}>;

export async function fetchVideoInformation(videoIdOrUrl: string): Promise<VideoInformation> {
  await loadYouTubeApiScript();
  const videoId = extractVideoId(videoIdOrUrl);
  console.log(videoId);
  const { promise, resolve } = Promise.withResolvers<VideoInformation>();

  const tempDiv = document.createElement("div");
  tempDiv.style.display = "none";
  tempDiv.id = videoId;
  document.body.appendChild(tempDiv);

  let player: Player;
  player = new window.YT.Player(videoId, {
    videoId,
    width: "480",
    height: "270",
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
    events: {
      onError: () => {
        player.destroy();
        tempDiv.remove();
      },
      onReady: () => {
        const videoInformation = {
          videoId,
          durationInSeconds: player.getDuration(),
          title: player.getVideoData().title,
        };
        player.destroy();
        tempDiv.remove();
        resolve(videoInformation);
      },
    },
  });
  return promise;
}

export function extractVideoId(videoIdOrUrl: string): string {
  // https://youtu.be/videoId?...
  const matchFirstFormat = videoIdOrUrl.match(/^(https?:\/\/)?youtu\.be\/([^?]+).*$/);
  if (matchFirstFormat !== null) {
    return matchFirstFormat[2]!;
  }

  // https://www.youtube.com/watch?v=videoId&...
  const matchSecondFormat = videoIdOrUrl.match(
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&#]+).*$/,
  );
  if (matchSecondFormat !== null) {
    return matchSecondFormat[3]!;
  }

  return videoIdOrUrl;
}
