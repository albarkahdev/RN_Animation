import { stories } from './InstagramStories';

export { default } from './InstagramStories';

export const avatarStories = stories.map(story => story.avatar);
export const storyAssets = stories.map(story => story.source);
