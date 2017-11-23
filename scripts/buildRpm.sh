#!/usr/bin/env bash

echo --- Building PRM using buildrpm. Using _topdir = ./build
echo --- Make sure to run this script using NPM, see ../package.json
echo

rpmbuild --define "_topdir $(pwd)/build" \
        --define "_name ${npm_package_name}" \
        --define "_version ${npm_package_version}" \
        --define "debug_package %{nil}" \
        -bb ./scripts/rpm.spec
