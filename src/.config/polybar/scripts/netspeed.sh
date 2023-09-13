#!/bin/bash

OUT=$(speedtest --unit=Mbps --precision=0 | grep Down)
PARSE=$(echo $OUT | sed -n 's/ *Download: *//p' | sed -n 's/Mbps.*/Mbps/p')

echo $PARSE
