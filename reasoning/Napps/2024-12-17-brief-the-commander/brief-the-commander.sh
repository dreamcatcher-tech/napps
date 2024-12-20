tree ./ > ./commander-briefing/folders.txt
concat --output ./commander-briefing/READMEs.md ./domains/**/README.md && 
concat --output ./commander-briefing/transcript-summaries.md ./data/transcripts/2024-12/**/*SUMMARY.md &&
concat --output ./commander-briefing/basic-definitions.md ./domains/innovation/**/*


#!/bin/bash

set -e
set -u

SOURCE_DIR="/Volumes/homes/malcolm/code/napps/reasoning"
OUTPUT_DIR="$HOME/Downloads/briefing"
OUTPUT_FILE="$OUTPUT_DIR/today-briefing.md"

mkdir -p "$OUTPUT_DIR"

# 1. Generate directory structure
tree "$SOURCE_DIR" > "$OUTPUT_DIR/folders.txt"

# 2. Run concat commands (only once per output)
concat --output "$OUTPUT_DIR/READMEs.md" "$SOURCE_DIR/domains"/**/README.md
concat --output "$OUTPUT_DIR/SUMMARIESs.md" "$SOURCE_DIR/data/transcripts/2024-12"/**/*SUMMARY.md
concat --output "$OUTPUT_DIR/DEFs.md" "$SOURCE_DIR/domains/innovation"/**/*

# 3. Create the final file with all formatting and a single output at the end
cat > "$OUTPUT_FILE" <<EOF
# Briefing
Generated on $(date)

## Table of Contents
- [Directory Structure](#directory-structure)
- [READMEs](#readmes)
- [SUMMARIES](#summaries)
- [DEFs](#defs)

## Directory Structure
EOF

# Append directory structure
cat "$OUTPUT_DIR/folders.txt" >> "$OUTPUT_FILE"

# Add the READMEs section with predefined formatting
cat >> "$OUTPUT_FILE" <<'EOF'


EOF

# Append READMEs, Summaries, and DEFs content
cat "$OUTPUT_DIR/READMEs.md" >> "$OUTPUT_FILE"

echo -e "\n## SUMMARIES\n" >> "$OUTPUT_FILE"
cat "$OUTPUT_DIR/SUMMARIESs.md" >> "$OUTPUT_FILE"

echo -e "\n## DEFs\n" >> "$OUTPUT_FILE"
cat "$OUTPUT_DIR/DEFs.md" >> "$OUTPUT_FILE"

echo "Briefing generation completed successfully."
echo "Find your briefing at $OUTPUT_FILE."
