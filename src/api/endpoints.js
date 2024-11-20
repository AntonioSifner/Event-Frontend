import e from "cors";

const BASE_URL = "https://localhost:7267";

export const LOGIN_ENDPOINT = `${BASE_URL}/login`;
export const LOGOUT_ENDPOINT = `${BASE_URL}/logout`;

export const REGISTER_ENDPOINT = `${BASE_URL}/register`;

export const EVENTS_ENDPOINT = `${BASE_URL}/events`;
export const EVENT_IMAGE_ENDPOINT = `${BASE_URL}/events/image`;

export const USER_ENDPOINT = `${BASE_URL}/users`;
export const USER_PROFILE_ENDPOINT = `${BASE_URL}/profile`;

export const COMMENTS_ENDPOINT = `${BASE_URL}/comments`;

export const ATTENDANCE_ENDPOINT = `${BASE_URL}/attendances`;

export const EVENT_TYPES_ENDPOINT = `${BASE_URL}/eventTypes`;
