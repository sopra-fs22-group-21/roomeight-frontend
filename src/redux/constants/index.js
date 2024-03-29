//API CLIENT CONSTANTS
export const API_CLIENT_REQUEST = 'API_CLIENT_REQUEST';

//AUTH CONSTANTS for firebase auth calls
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';

//Loading constants
export const ENTER_APP_LOADING = 'ENTER_APP_LOADING';

//USERPROFILE CONSTANTS for backend api calls
export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

export const GET_DOWNLOAD_URL_FAILURE = 'GET_DOWNLOAD_URL_FAILURE';

export const POST_USERPROFILE_REQUEST = 'POST_USERPROFILE_REQUEST';
export const POST_USERPROFILE_SUCCESS = 'POST_USERPROFILE_SUCCESS';
export const POST_USERPROFILE_FAILURE = 'POST_USERPROFILE_FAILURE';

export const UPDATE_USERPROFILE_REQUEST = 'UPDATE_USERPROFILE_REQUEST';
export const UPDATE_USERPROFILE_SUCCESS = 'UPDATE_USERPROFILE_SUCCESS';
export const UPDATE_USERPROFILE_FAILURE = 'UPDATE_USERPROFILE_FAILURE';

export const POST_PUSH_TOKEN_REQUEST = 'POST_PUSH_TOKEN_REQUEST';
export const POST_PUSH_TOKEN_SUCCESS = 'POST_PUSH_TOKEN_SUCCESS';
export const POST_PUSH_TOKEN_FAILURE = 'POST_PUSH_TOKEN_FAILURE';

export const DELETE_PUSH_TOKEN_REQUEST = 'DELETE_PUSH_TOKEN_REQUEST';
export const DELETE_PUSH_TOKEN_SUCCESS = 'DELETE_PUSH_TOKEN_SUCCESS';
export const DELETE_PUSH_TOKEN_FAILURE = 'DELETE_PUSH_TOKEN_FAILURE';

//DISCOVER PROFILE CONSTANTS for backend api calls
export const GET_DISCOVER_PROFILES_REQUEST = 'GET_DISCOVER_PROFILES_REQUEST';
export const GET_DISCOVER_PROFILES_SUCCESS = 'GET_DISCOVER_PROFILES_SUCCESS';
export const GET_DISCOVER_PROFILES_FAILURE = 'GET_DISCOVER_PROFILES_FAILURE';
export const UPDATE_DISCOVER_PROFILES = 'UPDATE_DISCOVER_PROFILES';
export const RELOAD_DISCOVER_PROFILES = 'RELOAD_DISCOVER_PROFILES';

export const POST_LIKE_REQUEST = 'POST_LIKE_REQUEST';
export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS';
export const POST_LIKE_FAILURE = 'POST_LIKE_FAILURE';

export const POST_DISLIKE_REQUEST = 'POST_DISLIKE_REQUEST';
export const POST_DISLIKE_SUCCESS = 'POST_DISLIKE_SUCCESS';
export const POST_DISLIKE_FAILURE = 'POST_DISLIKE_FAILURE';

export const MATCH_IS_VIEWED = 'MATCH_IS_VIEWED';

//FLATPROFILE CONSTANTS for backend api calls
export const GET_FLATPROFILE_REQUEST = 'GET_FLATPROFILE_REQUEST';
export const GET_FLATPROFILE_SUCCESS = 'GET_FLATPROFILE_SUCCESS';
export const GET_FLATPROFILE_FAILURE = 'GET_FLATPROFILE_FAILURE';

export const POST_FLATPROFILE_REQUEST = 'POST_FLATPROFILE_REQUEST';
export const POST_FLATPROFILE_SUCCESS = 'POST_FLATPROFILE_SUCCESS';
export const POST_FLATPROFILE_FAILURE = 'POST_FLATPROFILE_FAILURE';

export const UPDATE_FLATPROFILE_REQUEST = 'UPDATE_FLATPROFILE_REQUEST';
export const UPDATE_FLATPROFILE_SUCCESS = 'UPDATE_FLATPROFILE_SUCCESS';
export const UDPATE_FLATPROFILE_FAILURE = 'UPDATE_FLATPROFILE_FAILURE';

export const POST_ROOMMATE_TO_FLAT_REQUEST = 'POST_ROOMMATE_TO_FLAT_REQUEST';
export const POST_ROOMMATE_TO_FLAT_SUCCESS = 'POST_ROOMMATE_TO_FLAT_SUCCESS';
export const POST_ROOMMATE_TO_FLAT_FAILURE = 'POST_ROOMMATE_TO_FLAT_FAILURE';

export const POST_LEAVE_FLAT_REQUEST = 'POST_LEAVE_FLAT_REQUEST';
export const POST_LEAVE_FLAT_SUCCESS = 'POST_LEAVE_FLAT_SUCCESS';
export const POST_LEAVE_FLAT_FAILURE = 'POST_LEAVE_FLAT_FAILURE';

export const ROOMMATE_JOINED_FLAT = 'ROOMMATE_JOINED_FLAT';
export const ROOMMATE_LEFT_FLAT = 'ROOMMATE_LEFT_FLAT';

//SET TRANSIT ATTRIBUTES
export const SET_TRANSIT_ATTRIBUTES_USERPROFILE =
    'SET_TRANSIT_ATTRIBUTES_USERPROFILE';
export const SET_TRANSIT_ATTRIBUTES_FLATPROFILE =
    'SET_TRANSIT_ATTRIBUTES_FLATPROFILE';
export const SET_TRANSIT_PROFILE_COMPLETION_STATUS =
    'SET_TRANSIT_PROFILE_COMPLETION_STATUS';

//images
export const SET_LOCAL_PICTURE_REFERENCES_FLAT =
    SET_LOCAL_PICTURE_REFERENCES_FLAT;
export const SET_LOCAL_PICTURE_REFERENCES_USER =
    SET_LOCAL_PICTURE_REFERENCES_USER;

//UPLOAD TO FIREBASE STORAGE
export const UPLOAD_IMAGE_REQUEST_USERPROFILE =
    'UPLOAD_IMAGE_REQUEST_USERPROFILE';
export const UPLOAD_IMAGE_SUCCESS_USERPROFILE =
    'UPLOAD_IMAGE_SUCCESS_USERPROFILE';
export const UPLOAD_IMAGE_FAILURE_USERPROFILE =
    'UPLOAD_IMAGE_FAILURE_USERPROFILE';

export const UPLOAD_IMAGE_REQUEST_FLATPROFILE =
    'UPLOAD_IMAGE_REQUEST_FLATPROFILE';
export const UPLOAD_IMAGE_SUCCESS_FLATPROFILE =
    'UPLOAD_IMAGE_SUCCESS_FLATPROFILE';
export const UPLOAD_IMAGE_FAILURE_FLATPROFILE =
    'UPLOAD_IMAGE_FAILURE_FLATPROFILE';

//CHAT ACTIONS
export const CHAT_MEMBERSHIP_LISTENER_STARTED =
    'CHAT_MEMBERSHIP_LISTENER_STARTED';
export const CHAT_MEMBERSHIP_CHANGE = 'CHAT_MEMBERSHIP_CHANGE';

export const CHAT_INFO_LISTENER_STARTED = 'CHAT_INFO_LISTENER_STARTED';
export const CHAT_INFO_CHANGE = 'CHAT_INFO_CHANGE';

export const CHAT_MESSAGES_LISTENER_STARTED = 'CHAT_MESSAGES_LISTENER_STARTED';
export const NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE';

export const CONNECTION_CHANGE = 'CONNECTION_CHANGE';
export const CONNECTION_CHANGE_FAILURE = 'CONNECTION_CHANGE_FAILURE';

export const LOAD_MESSAGES_REQUEST = 'LOAD_MESSAGES_REQUEST';
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
export const LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const CREATE_CHAT_REQUEST = 'CREATE_CHAT_REQUEST';
export const CREATE_CHAT_SUCCESS = 'CREATE_CHAT_SUCCESS';
export const CREATE_CHAT_FAILURE = 'CREATE_CHAT_FAILURE';

export const DELETE_CHAT_REQUEST = 'DELETE_CHAT_REQUEST';
export const DELETE_CHAT_SUCCESS = 'DELETE_CHAT_SUCCESS';
export const DELETE_CHAT_FAILURE = 'DELETE_CHAT_FAILURE';

//MATCHES & LIKES
export const MATCHES_AND_LIKES_LISTENER_STARTED =
    'MATCHES_AND_LIKES_LISTENER_STARTED';
export const NEW_LIKE = 'NEW_LIKE';
export const NEW_MATCH = 'NEW_MATCH';
export const NEW_MATCH_IN_PROGRESS = 'NEW_MATCH_IN_PROGRESS';
export const NOTIFICATIONS_LISTENER_STARTED = 'NOTIFICATIONS_LISTENER_STARTED';
