#!/bin/sh

set -eu

SUBMISSION_PATH="submission.regex"

log_usage() {
  echo "\
usage: $0 [--file PATH] [--start N] [--end N] [--expected N] [--debug] [--help]

Tests your regex submission in '$SUBMISSION_PATH' against a test input file.
Running this script with no arguments should pass if you have implemented the
regex correctly, but keep in mind you will NOT be graded on this exact input!"
}

FILE_PATH="course-catalog.txt"
START_LINE="1"
END_LINE=""
EXPECTED="51"
while test $# -gt 0; do
  case "$1" in
    --help | -h)
      log_usage
      exit 0
      ;;
    --debug)
      set -x
      ;;
    --start)
      shift
      START_LINE="$1"
      ;;
    --end)
      shift
      END_LINE="$1"
      ;;
    --expected)
      shift
      EXPECTED="$1"
      ;;
    *)
      echo "Invalid option: $1"
      log_usage
      exit 1
      ;;
  esac
  shift
done

if [ "$END_LINE" = "" ]; then
  END_LINE="$(wc -l "$FILE_PATH" | awk '{ print $1 }')"
fi

trap "echo FAILED, cleaning up...; exit 1" EXIT

regex_test() {
  sed -n ${START_LINE},${END_LINE}p "$FILE_PATH" \
    | grep -E -f "$SUBMISSION_PATH" "$@"
}

MATCHES="$(regex_test)"
NUM_MATCHES="$(regex_test -c)"
if [ "$EXPECTED" = "" ]; then
  echo "$MATCHES"
  echo
  echo "WARNING: expected num matches not defined (found $NUM_MATCHES)." >&2
  trap "" EXIT
  exit 1
fi

if [ "$EXPECTED" != "" ] && [ "$(regex_test -c)" = "$EXPECTED" ]; then
  trap "echo PASS" EXIT
  exit 0
fi

echo "$MATCHES"
echo
echo "ERROR: expected $EXPECTED matches, but found $NUM_MATCHES" >&2
exit 1
