#!/bin/bash

./stop

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <Mastodon version>"
  exit 1
fi

# Backup Postgres DB
pg_dump -U db_user -f ~/apps/mastodon/db.sql db_name

# Fetch new version of mastodon
source setenv
cd mastodon
git checkout -- .
git fetch && git checkout $1

# Install new version
bundle config set jobs 4
bundle install
yarn install --frozen-lockfile
