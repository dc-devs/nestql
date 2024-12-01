#!/bin/bash

HOSTNAME="local.nestql.com"
HOSTS_FILE="/etc/hosts"

# Check if script is run with sudo
if [ "$EUID" -ne 0 ]; then
	echo "Please run with sudo"
	exit 1
fi

# Check if hostname already exists in hosts file
if grep -q "$HOSTNAME" "$HOSTS_FILE"; then
	echo "Host $HOSTNAME already exists in $HOSTS_FILE"
	exit 0
fi

# Add hostname without quotes
echo "127.0.0.1  $HOSTNAME" >> "$HOSTS_FILE"
echo "Added $HOSTNAME to $HOSTS_FILE"