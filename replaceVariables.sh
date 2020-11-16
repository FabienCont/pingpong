#!/bin/bash

# Exit on fail
set -e

replace_variables_file() {
  OLD="window.SERVER_URL='http://localhost:3000'"
  NEW="window.SERVER_URL='"$BACKEND_ENDPOINT"'"
  #escape chars
  OLD=${OLD//"/"/"\/"}
  NEW=${NEW//"/"/"\/"}
  sed -i "s/$OLD/$NEW/g" dist/index.html
  cat dist/index.html
}
replace_variables_file

exit 0
