#!/bin/bash

# Latitude and Longitude range for Purdue University area (West Lafayette, IN)
LAT_MIN=40.4215
LAT_MAX=40.4300
LON_MIN=-86.9241
LON_MAX=-86.9060

# Random function to generate random float within a given range
random_float() {
    echo "$(awk -v min=$1 -v max=$2 'BEGIN{srand(); print min+rand()*(max-min)}')"
}

# Categories from the picker items
categories=("Violence" "Raised Voices" "General Suspicious Activity" "Theft" "Harassment" "Stalking")

# Generate random description based on category
generate_description() {
    local category=$1
    case $category in
        "Violence") echo "Physical altercation reported";;
        "Raised Voices") echo "Loud verbal dispute heard";;
        "General Suspicious Activity") echo "Unusual behavior observed";;
        "Theft") echo "Personal property stolen";;
        "Harassment") echo "Individual reported unwanted attention";;
        "Stalking") echo "Repeated unwanted following observed";;
        *) echo "No description available";;
    esac
}

# Capture arguments passed to the script
args=("$@")
echo "$# arguments passed"  # Prints the number of arguments passed
echo "Arguments: ${args[0]} ${args[1]} ${args[2]}"  # Prints the first 3 arguments

num_incidents=1

if [ $# -ge 1 ]; then
    num_incidents=${args[0]}  
fi

generate_incident() {
    local category="${categories[$RANDOM % ${#categories[@]}]}"
    local description="$(generate_description "$category")"

    local incident_data
    incident_data=$(cat <<EOF
{
    "Category": "$category",
    "Description": "$description",
    "Latitude": $(random_float $LAT_MIN $LAT_MAX),
    "Longitude": $(random_float $LON_MIN $LON_MAX)
}
EOF
)
    # Send the POST request using curl
    curl -X POST http://localhost:8080/incidents \
        -H "Content-Type: application/json" \
        -d "$incident_data"
}

# Loop to generate the specified number of incidents
for ((i = 1; i <= num_incidents; i++)); do
    generate_incident
done
