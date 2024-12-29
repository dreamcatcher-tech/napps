#!/usr/bin/env bash

# Name this file something like run_concat.sh and make it executable:
# chmod +x run_concat.sh

# 1. Define the array of files
files=(
"README_utf8.md"
)

# 2. Make (or clear) an output file
> output.txt

# 3. Loop through each file
for file in "${files[@]}"; do
  echo "Running concat on: $file"
  
  # Capture the output of concat
  concat_output=$(concat "$file" 2>&1)
  
  # The concat output is expected to contain a line like:
  # "Operation complete! created concat.txt with XXX o1 token"
  # We'll grep for the number (XXX)
  token_count=$(echo "$concat_output" | grep -oE 'with[[:space:]]+[0-9]+[[:space:]]+o1 token' | grep -oE '[0-9]+')
  
  # If we found the token count, write "<filename> <count>" to output.txt
  if [[ -n "$token_count" ]]; then
    echo "$file $token_count" >> output.txt
  else
    # If we didn't find it, maybe log an error or mark it
    echo "$file ERROR_NO_TOKEN_FOUND" >> output.txt
  fi
done

echo "Done! Check output.txt for results."

