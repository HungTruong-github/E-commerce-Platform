#!/bin/sh
# wait-for-it.sh: wait until a given host and port are accepting connections
set -e

HOST="$1"
PORT="$2"
TIMEOUT="${3:-30}"

if [ -z "$HOST" ] || [ -z "$PORT" ]; then
  echo "Usage: ./wait-for-it.sh host port [timeout_seconds]"
  exit 1
fi

echo "Waiting for $HOST:$PORT to be ready (timeout: ${TIMEOUT}s)..."

for i in $(seq 1 "$TIMEOUT"); do
  nc -z "$HOST" "$PORT" > /dev/null 2>&1 && {
    echo "$HOST:$PORT is ready!"
    exit 0
  }
  sleep 1
done

echo "Timeout reached waiting for $HOST:$PORT"
exit 1

