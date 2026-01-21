#!/bin/sh
# Opens content.json in the default editor and serves the folder at http://localhost:8000
# Usage: sh edit-and-serve.sh (run from the directory containing content.json)

open "content.json"
python3 -m http.server 8000
