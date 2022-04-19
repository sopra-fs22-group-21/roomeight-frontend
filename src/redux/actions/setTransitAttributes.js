import * as Constants from '../constants';

/**
 * Sets the transit object to later send to the backend! must always be an object!
 * @param {object} attributes - @example attributes: {
 *  firstName: 'name',
 *  description: 'description'
 * }
 * @param {'userprofile' | 'flatprofile'} profileType - 'userprofile' or 'flatprofile'
 * @dispatches {@link Constants.SET_TRANSIT_ATTRIBUTES_FLATPROFILE} | {@link Constants.SET_TRANSIT_ATTRIBUTES_USERPROFILE}
 */
export const setTransitAttributes = (attributes, profileType) =>
    profileType === 'userprofile'
        ? {
              type: Constants.SET_TRANSIT_ATTRIBUTES_USERPROFILE,
              payload: attributes,
          }
        : {
              type: Constants.SET_TRANSIT_ATTRIBUTES_FLATPROFILE,
              payload: attributes,
          };
