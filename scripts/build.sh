
#!/usr/bin/env bash
npm run clean



export $(egrep -v '^#' .browser-env | xargs) > /dev/null
next build