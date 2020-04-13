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
export const GITHUB_APP_NAME = productNames.githubAppName
export const GITLAB_APP_NAME = productNames.gitlabAppName
export const BITBUCKET_APP_NAME = productNames.bitbucketAppName
// For v1 docs, use separate variable names just in case
export const PRODUCT_V1 = productNames.productV1
export const ORGANIZATION_V1 = productNames.organizationV1
export const PRODUCT_SHORT_V1 = productNames.productShortV1
export const CLI_V1 = productNames.cliV1
