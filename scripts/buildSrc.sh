#!/usr/bin/env bash

echo --- Packaging project sources for RPM build to build/SOURCES/${npm_package_name}.tar.gz
echo --- Make sure to run this script using NPM, see ../package.json
echo

tar --exclude-from='.tarignore' --exclude-from='.gitignore' -zcvf build/SOURCES/${npm_package_name}.tar.gz .