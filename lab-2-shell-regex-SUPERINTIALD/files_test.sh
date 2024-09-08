#!/bin/bash

set -eu

EXPECTED_FILES="
git_merge_conflict.txt
git_pull_request.png
intro_to_navigating_filesystem.txt
submission.regex
"

log_usage() {
  echo "\
usage: $0 [--debug] [--help]

Tests your submission contains all the expected files.
This does NOT check that your files contents are correct, but we will!"
}

while test $# -gt 0; do
  case "$1" in
    --help | -h)
      log_usage
      exit 0
      ;;
    --debug)
      set -x
      ;;
    *)
      echo "Invalid option: $1"
      log_usage
      exit 1
      ;;
  esac
  shift
done

_strip() {
  echo "$1" \
    | sed -e '/^\s*#.*$/d' -e '/^\s*$/d' \
    | tr '\n' ' '
}

trap "echo FAILED, cleaning up...; exit 1" EXIT

EXPECTED_FILES="$(_strip "$EXPECTED_FILES")"
NUM_MISSING=0
NUM_EXPECTED=0

for path in $EXPECTED_FILES; do
  NUM_EXPECTED=$((NUM_EXPECTED + 1))
  if ! [ -f "$path" ]; then
    echo "ERROR: missing '$path'" >&2
    NUM_MISSING=$((NUM_MISSING + 1))
  fi
done

if [ "$NUM_MISSING" = "0" ]; then
  trap "echo PASS" EXIT
  exit 0
fi

echo
echo "ERROR: missing $NUM_MISSING/$NUM_EXPECTED files" >&2
exit 1
