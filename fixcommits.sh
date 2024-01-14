#!/bin/bash

OLD_EMAIL="nunya@goaway.net"
CORRECT_NAME="smuser90"
CORRECT_EMAIL="sam.musso90@gmail.com"

git filter-branch --env-filter '
WRONG_EMAIL="$OLD_EMAIL"
NEW_NAME="$CORRECT_NAME"
NEW_EMAIL="$CORRECT_EMAIL"
if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags

