export const moodProfiles = {
  talk: {
    background: "/cozy_room_sunny_animated.gif",
    lighting: "warm",
    energy: 0.4,
    music: "off",
    weather: "clear",
  },

  vent: {
    background: "/cozy_room_rainy_animated.gif",
    lighting: "soft",
    energy: 0.2,
    music: "quiet",
    weather: "rain",
  },

  understand: {
    background: "/cozy_room_snowy_animated.gif",
    lighting: "calm",
    energy: 0.3,
    music: "quiet",
    weather: "snow",
  },

  advice: {
    background: "/cozy_room_sunset_animated.gif",
    lighting: "warm",
    energy: 0.5,
    music: "lofi",
    weather: "sunset",
  },

  fun: {
    background: "/cozy_room_sunny_animated.gif",
    lighting: "bright",
    energy: 0.8,
    music: "upbeat",
    weather: "clear",
  },
};


export const DEFAULT_ENVIRONMENT = {
  mood: "talk",

  background: moodProfiles.talk.background,

  lighting: moodProfiles.talk.lighting,

  energy: moodProfiles.talk.energy,

  music: moodProfiles.talk.music,

  weather: moodProfiles.talk.weather,

  time: "day",

  curtains: "open",
};
