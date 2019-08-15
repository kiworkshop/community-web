#!/usr/bin/env bash

# set environment variable from .env
# https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836

npm run compileServer
if [ $? != 0 ]
  then echo '>> failed to compile server <<'
  exit 1
fi

export $(egrep -v '^#' .node-env | xargs) > /dev/null
export $(egrep -v '^#' .browser-env | xargs) > /dev/null
node -r tsconfig-paths/register server