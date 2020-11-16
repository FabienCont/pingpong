#!/bin/bash

# Exit on fail
set -e

# Start as client
if [ "$START_AS_CLIENT" == "true" ]; then
    chmod +x replaceVariables.sh
    ./replaceVariables.sh
    nginx -g 'daemon off;'
else # or by default: start what is defined in CMD
    exec "$@"
fi
