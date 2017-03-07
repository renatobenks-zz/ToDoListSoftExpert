#!/bin/sh

while echo $1 | grep -q ^--; do
    eval $( echo $1 | sed 's/^--//' )=$2
    shift
    shift
done

echo Creating branch $task
git checkout -b $task
git branch -vvv
