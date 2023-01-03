#!/bin/bash

COMMIT="$(git log --pretty=format:%s -1)"

echo $COMMIT

NC='\033[0m'        # No Color
BRed='\033[1;31m'   # Red
BGreen='\033[1;32m' # Green

commit_pattern="^(build|docs|feat|fix|refactor|pref|test|ci): .*+$"
merge_pattern="^(Merge) .*+$"

if [[ $COMMIT =~ $commit_pattern || $COMMIT =~ $merge_pattern ]]; then
  printf "$BGreen[LOGS] SUCCESS :${NC} commit validation success...."
else
  printf "${BRed}[LOGS] ERROR${NC} : commit is not valid!!!"
  exit 1
fi

