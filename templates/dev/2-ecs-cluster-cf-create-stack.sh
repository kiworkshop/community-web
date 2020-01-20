#!/usr/bin/env bash

python3 ./2-ecs-cluster-cf-template.py > 2-ecs-cluster-cf.template

aws --profile ki cloudformation create-stack \
--stack-name community-web-dev-cluster \
--capabilities CAPABILITY_IAM \
--template-body file://2-ecs-cluster-cf.template \
--parameters \
ParameterKey=KeyPair,ParameterValue=community-dev \
ParameterKey=VpcId,ParameterValue=vpc-aa07c7c1 \
ParameterKey=PublicSubnet,ParameterValue=subnet-43a3850f\\,subnet-4d03ac36\\,subnet-6f5aa804