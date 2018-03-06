FROM node:9.7.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./entrypoint.sh /
CMD ["/entrypoint.sh"]