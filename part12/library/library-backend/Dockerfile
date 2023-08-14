FROM node:16
WORKDIR /usr/src/app
COPY --chown=node:node ./library-backend .
RUN npm ci

USER node
CMD npm start