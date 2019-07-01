workflow "Build and Index Files" {
  on = "push"
  resolves = ["Index Files"]
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install" {
  needs = ["Master"]
  uses = "docker://mhart/alpine-node:10"
  runs = "sh -c"
  args = ["yarn install --production"]
}

action "Index Files" {
  needs = ["Install"]
  uses = "docker://mhart/alpine-node:10"
  runs = "sh -c"
  secrets = ["ALGOLIA_API_KEY"]
  args = ["ALGOLIA_API_KEY=$ALGOLIA_API_KEY yarn docs-index"]
}

workflow "visual diff" {
  resolves = "nextdiff"
  on = "deployment_status"
}

action "nextdiff" {
  uses = "zeit/nextdiff@master"
  secrets = ["GITHUB_TOKEN","ZEIT_TOKEN"]
}
