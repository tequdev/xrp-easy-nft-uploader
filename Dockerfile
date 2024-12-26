FROM public.ecr.aws/lambda/nodejs:22
WORKDIR  /var/task/

COPY package.json package-lock.json ./
RUN npm i --production

COPY index.js ./

CMD ["index.handler"]
