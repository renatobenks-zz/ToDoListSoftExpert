#!/usr/bin/env bash

while echo $1 | grep -q ^--; do
    eval $( echo $1 | sed 's/^--//' )=$2
    shift
    shift
done

python ./get_tasks.py $username $password $request
