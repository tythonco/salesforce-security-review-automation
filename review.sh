#!/bin/sh

set -o allexport
source .env
set +o allexport

VERSION=$1

if [ -z "$VERSION" ] ; then
    read -p "Package version? (${PACKAGE_VERSION_ID}) " VERSION
    if [ -z $VERSION ] ; then
        VERSION="${PACKAGE_VERSION_ID}"
    fi
fi

if [ -z "$HEADLESS" ] ; then
    HEADLESS=1
fi

if [ $HEADLESS -eq 1 ]; then
    PACKAGE_VERSION_ID=${VERSION} npx playwright test
else
    PACKAGE_VERSION_ID=${VERSION} npx playwright test --headed
fi