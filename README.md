# Image Uploader for XRP Easy NFT (https://xrpeasynft.com)

## Development
### Build Image
`docker build -t xrp-easy-nft-uploader .`

### Run Service
`docker run --name=xrp-easy-nft-uploader --rm -p=8080:8080 xrp-easy-nft-uploader:latest`

### RUN script
`curl -X POST "http://localhost:8080/2015-03-31/functions/function/invocations" -d '{"key":"value"}'`


## Deploy
### Tagging
`docker tag xrp-easy-nft-uploader:latest ${ACCOUNTID}.dkr.ecr.${REGION}.amazonaws.com/xrp-easy-nft-uploader:latest`

### Login ECR
`aws ecr get-login-password | docker login --username AWS --password-stdin ${ACCOUNTID}.dkr.ecr.${REGION}.amazonaws.com`

### Push
`docker push ${ACCOUNTID}.dkr.ecr.${REGION}.amazonaws.com/xrp-easy-nft-uploader:latest`

