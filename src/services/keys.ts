export const pageCacheKey = (id: string) => `pagecache#${id}`;

export const usersKey = (userId: string) => `users#${userId}`;

export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;

export const usernamesUniqueKey = () => 'usernames:unique';

export const userLikesKey = (userId: string) => `users:likes#${userId}`;


export const usernamesKey = () => 'usernames';


// Items

export const itemsKey = (itemId: string) => `items#${itemId}`;

export const itemsByViewsKey = () => 'items:views';
export const itemsByEndingAtKey = () => 'items:endingat';
export const itemsByLikesKey = () => 'items:likes';
export const itemsViewsKey = (itemId: string) => `items:views#${itemId}`;

export const itemCommentsKey = (itemId: string) => `items:comments#${itemId}`;