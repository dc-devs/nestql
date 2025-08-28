#!/bin/bash

HOSTNAMES=("local.nestql.com" "nestql.com")
HOSTS_FILE="/etc/hosts"

# Check if script is run with sudo
if [ "$EUID" -ne 0 ]; then
	echo "Please run with sudo"
	exit 1
fi

# Loop through each hostname
for HOSTNAME in "${HOSTNAMES[@]}"; do
	# Check if hostname already exists in hosts file (exact match)
	if grep -q "127.0.0.1.*[[:space:]]$HOSTNAME[[:space:]]*$" "$HOSTS_FILE"; then
		echo "Host $HOSTNAME already exists in $HOSTS_FILE"
	else
		# Add hostname without quotes
		echo "127.0.0.1  $HOSTNAME" >> "$HOSTS_FILE"
		echo "Added $HOSTNAME to $HOSTS_FILE"
	fi
done