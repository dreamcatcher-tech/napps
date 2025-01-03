concat "/Volumes/homes/malcolm/code/napps/reasoning/domains/**/*" && mv concat.txt concat-domains.txt
concat "/Volumes/homes/malcolm/code/napps/reasoning/stucks/**/*" && mv concat.txt concat-stucks.txt
concat "/Volumes/homes/malcolm/code/napps/reasoning/ingest/**/*" && mv concat.txt concat-ingest.txt
concat concat-domains.txt concat-stucks.txt concat-ingest.txt