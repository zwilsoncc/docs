import productNames from './product-names.json'

// UI Constants
export const HEADER_HEIGHT = 64

// API Endpoints
export const API_USER = '/api/www/user'
export const API_USER_TOKENS = '/v3/user/tokens'
export const API_USER_TOKEN_TESTING = '/api/user/tokens/testing'
export const API_TEAMS = '/api/teams'
export const API_DOCS_FEEDBACK = 'https://zeit.co/feedback-api'
export const API_LIMITS = 'https://api.zeit.co/v1/ratelimits'
export const API_FRAMEWORKS = '/api/v1/frameworks'

// Product names: Use JSON so it can be imported in scripts
export const PRODUCT = productNames.product
export const CDN_NAME = productNames.cdnName
export const ORGANIZATION = productNames.organization
export const PRODUCT_SHORT = productNames.productShort
export const PRODUCT_V1 = productNames.productV1
