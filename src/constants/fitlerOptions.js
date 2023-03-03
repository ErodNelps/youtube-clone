export const UPDATE_DATE_OPTIONS = [
  {
    text: "Last hour",
    key: "publishedAfter",
    value: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), // published after last hour = 1h(~3600 seconds)
    restrictions: [{ key: "type", values: ["channel", "playlist"] }],
  },
  {
    text: "Today",
    key: "publishedAfter",
    value: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // published after last hour = 24h(~24*3600 seconds)
    restrictions: [{ key: "type", values: ["channel", "playlist"] }],
  },
  {
    text: "This week",
    key: "publishedAfter",
    value: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(), // published after last hour = 7 days = 7*24h(~7*24*3600 seconds)
    restrictions: [{ key: "type", values: ["channel", "playlist"] }],
  },
  {
    text: "This month",
    key: "publishedAfter",
    value: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    restrictions: [{ key: "type", values: ["channel", "playlist"] }],
  },
  {
    text: "This year",
    key: "publishedAfter",
    value: new Date(Date.now() - 365 * 24 * 3600 * 1000).toISOString(),
    restrictions: [{ key: "type", values: ["channel", "playlist"] }],
  },
];

export const TYPE_OPTIONS = [
  {
    text: "Video",
    key: "type",
    value: "video",
    restrictions: [],
  },
  {
    text: "Channel",
    key: "type",
    value: "channel",
    restrictions: [
      // UPDATE DATE
      { key: "publishedAfter" },

      // DURATION
      { key: "videoDuration", values: ["short", "medium", "long"] },

      // FEATURES
      { key: "videoDefinition", values: ["high"] },
      { key: "videoCaption", values: ["closedCaption"] },
      { key: "videoDimension", values: ["3d"] },
    ],
  },
  {
    text: "Playlist",
    key: "type",
    value: "playlist",
    restrictions: [
      // DURATION
      { key: "videoDuration", values: ["short", "medium", "long"] },

      // FEATURES
      { key: "videoDefinition", values: ["high"] },
      { key: "videoCaption", values: ["closedCaption"] },
      { key: "videoDimension", values: ["3d"] },

      // UPDATE DATE
      { key: "publishedAfter" },
    ],
  },
  {
    text: "Movie",
    key: "videoType",
    value: "movie",
    restrictions: [],
  },
];

export const DURATION_OPTIONS = [
  {
    text: "Under 4 minutes",
    key: "videoDuration",
    value: "short",
    restrictions: [
      // TYPE
      { key: "type", values: ["channel", "playlist"] },
    ],
  },
  {
    text: "4 - 20 minutes",
    key: "videoDuration",
    value: "medium",
    restrictions: [
      // TYPE
      { key: "type", values: ["channel", "playlist"] },
    ],
  },
  {
    text: "Over 20 minutes",
    key: "videoDuration",
    value: "long",
    restrictions: [
      // TYPE
      { key: "type", values: ["channel", "playlist"] },
    ],
  },
];

export const FEATURE_OPTIONS = [
  {
    text: "Subtitles/cc",
    key: "videoCaption",
    value: "closedCaption",
    restrictions: [
      // TYPE only video is allowed
      { key: "type", values: ["channel", "playlist", "movie"] },
    ],
  },
  {
    text: "HD",
    key: "videoDefinition",
    value: "high",
    restrictions: [
      // TYPE only video is allowed
      { key: "type", values: ["channel", "playlist", "movie"] },
    ],
  },
  {
    text: "3D",
    key: "videoDimension",
    value: "3d",
    restrictions: [
      // TYPE only video is allowed
      { key: "type", values: ["channel", "playlist", "movie"] },
    ],
  },
];

export const ORDER_OPTIONS = [
  {
    text: "Relevance",
    key: "order",
    value: "relevance",
    restrictions: [],
  },
  {
    text: "Upload date",
    key: "order",
    value: "date",
    restrictions: [],
  },
  {
    text: "View count",
    key: "order",
    value: "viewCount",
    restrictions: [],
  },
  {
    text: "Rating",
    key: "order",
    value: "rating",
    restrictions: [],
  },
];
