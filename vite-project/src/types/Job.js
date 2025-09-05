/**
 * @typedef {object} Job
 * @property {number} id
 * @property {string} title
 * @property {string} hospital
 * @property {string} location
 * @property {"full-time" | "part-time" | "contract" | "locum"} jobType
 * @property {string} salary
 * @property {string} description
 * @property {string} postedDate
 * @property {string} specialty
 * @property {"entry" | "mid" | "senior" | "consultant"} experience
 */
export const Job = {};

/**
 * @typedef {object} FilterState
 * @property {string} search
 * @property {string} location
 * @property {string} specialty
 * @property {string[]} jobTypes
 * @property {string[]} experienceLevels
 * @property {string[]} salaryRanges
 */
export const FilterState = {};

/**
 * @typedef {object} SignupData
 * @property {"jobseeker" | "employer"} type
 * @property {string} fullName
 * @property {string} email
 * @property {string} password
 * @property {string} [profession]
 * @property {string} [experience]
 * @property {string} [organizationName]
 * @property {string} [organizationType]
 */
export const SignupData = {};
