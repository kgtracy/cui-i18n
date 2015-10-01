#!/bin/bash

# quick script to run the native2ascii script on all properties files in the dist/java foldder

FILES=dist/cui-i18n/java/*.properties
mkdir -p dist/cui-i18n/java/ascii

for file in $FILES
do
  native2ascii -encoding utf8 "$file" dist/cui-i18n/java/ascii/"${file##*/}"
done
